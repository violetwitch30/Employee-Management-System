require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload-minimal');
const cors = require('cors');

const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const getUser = require('./utils/auth');

const app = express();

app.use(cors());
app.use(graphqlUploadExpress());

async function startServer() {
    await connectDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        uploads: false,
        context: ({ req }) => {
            const token = req.headers.authorization?.split(' ')[1];
            const user = getUser(token);
            return { user };
        }
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(5000, () =>
        console.log(`Server running at http://localhost:5000/graphql`)
    );
}

startServer().catch(err => {
    console.error("Server failed to start:");
    console.error(err);
});