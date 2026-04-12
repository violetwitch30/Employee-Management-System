const { GraphQLScalarType, Kind } = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Employee = require("../models/Employee");
const cloudinary = require("../utils/cloudinary");

// ---------------- DATE SCALAR ----------------
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom Date scalar",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return new Date(value).toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

// ---------------- AUTH HELPER ----------------
const requireAuth = (context) => {
  if (!context.user) throw new Error("Not authenticated. Please login.");
};

// ---------------- RESOLVERS ----------------
const resolvers = {
  Date: dateScalar,

  // ---------------- QUERIES ----------------
  Query: {
    // LOGIN
    login: async (_, { input }) => {
      const { email, username, password } = input;

      if (!email && !username) throw new Error("Provide email or username");

      const user = await User.findOne(email ? { email } : { username });

      if (!user) throw new Error("Invalid credentials");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      return { token, user };
    },

    // GET ALL EMPLOYEES
    employees: async (_, __, context) => {
      requireAuth(context);
      return Employee.find();
    },

    // GET EMPLOYEE BY ID
    employee: async (_, { id }, context) => {
      requireAuth(context);

      const employee = await Employee.findById(id);
      if (!employee) throw new Error("Employee not found");

      return employee;
    },

    // SEARCH EMPLOYEES
    searchEmployees: async (_, { department, designation }, context) => {
      requireAuth(context);

      if (!department && !designation)
        throw new Error("Provide department or designation to search");

      const filter = {};

      if (department) filter.department = new RegExp(department, "i");

      if (designation) filter.designation = new RegExp(designation, "i");

      return Employee.find(filter);
    },
  },

  // ---------------- MUTATIONS ----------------
  Mutation: {
    // SIGNUP
    signup: async (_, { input }) => {
      const { username, email, password } = input;

      if (password.length < 6)
        throw new Error("Password must be at least 6 characters");

      const existingUser = await User.findOne({ email });

      if (existingUser) throw new Error("Email already exists");

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await user.save();
      return user;
    },

    // ADD EMPLOYEE
    addEmployee: async (_, { input, file }, context) => {
      requireAuth(context);

      const { first_name, last_name, email, salary } = input;

      if (!first_name || !last_name)
        throw new Error("First name and last name are required");

      if (salary < 1000) throw new Error("Salary must be at least 1000");

      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) throw new Error("Employee email already exists");

      let imageUrl = null;

      if (file) {
        const { createReadStream, filename } = await file.promise;
        const stream = createReadStream();

        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "employees", public_id: filename },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );

          stream.pipe(uploadStream);
        });

        imageUrl = uploadResult.secure_url;
      }

      const employee = new Employee({
        ...input,
        employee_photo: imageUrl,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await employee.save();
      return employee;
    },

    // UPDATE EMPLOYEE
    updateEmployee: async (_, { id, input, file }, context) => {
      requireAuth(context);

      if (input.salary && input.salary < 1000)
        throw new Error("Salary must be at least 1000");

      let imageUrl;

      if (file) {
        const { createReadStream, filename } = await file.promise;
        const stream = createReadStream();

        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "employees", public_id: filename },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );

          stream.pipe(uploadStream);
        });

        imageUrl = uploadResult.secure_url;
      }

      const updateData = {
        ...input,
        updated_at: new Date(),
      };

      if (imageUrl) {
        updateData.employee_photo = imageUrl;
      }

      const employee = await Employee.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!employee) throw new Error("Employee not found");

      return employee;
    },

    // DELETE EMPLOYEE
    deleteEmployee: async (_, { id }, context) => {
      requireAuth(context);

      const employee = await Employee.findByIdAndDelete(id);

      if (!employee) throw new Error("Employee not found");

      return "Employee deleted successfully";
    },
  },
};

module.exports = resolvers;
