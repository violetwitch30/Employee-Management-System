const { gql } = require('apollo-server-express');

const typeDefs = gql`

scalar Date
scalar Upload

type User {
    id: ID!
    username: String!
    email: String!
    created_at: Date
    updated_at: Date
}

type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: Date!
    department: String!
    employee_photo: String
    created_at: Date
    updated_at: Date
}

input SignupInput {
    username: String!
    email: String!
    password: String!
}
    
input LoginInput {
    username: String
    email: String
    password: String!
}

input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: Date!
    department: String!
    employee_photo: Upload
}
    
input UpdateEmployeeInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    designation: String
    salary: Float
    date_of_joining: Date
    department: String
}
    
type AuthPayload {
    token: String!
    user: User!
}
    
type Query {
    login(input: LoginInput!): AuthPayload!
    employees: [Employee!]!
    employee(id: ID!): Employee
    searchEmployees(department: String, designation: String): [Employee!]!
}
    
type Mutation {
    signup(input: SignupInput!): User!
    addEmployee(input: EmployeeInput!, file: Upload): Employee!
    updateEmployee(id: ID!, input: UpdateEmployeeInput!): Employee!
    deleteEmployee(id: ID!): String!
}
`;

module.exports = typeDefs;