require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload-minimal");
const cors = require("cors");

const connectDB = require("./config/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const getUser = require("./utils/auth");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://101504996-comp3133-assignment2-fron.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(graphqlUploadExpress());

let serverStarted = false;

async function startServer() {
  if (serverStarted) return app;

  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
    context: ({ req }) => {
      const token = req.headers.authorization?.split(" ")[1];
      const user = getUser(token);
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  serverStarted = true;

  return app;
}

module.exports = async (req, res) => {
  const app = await startServer();
  return app(req, res);
};
