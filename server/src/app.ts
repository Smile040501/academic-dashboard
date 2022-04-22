import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";

import { connectDB, corsOptions } from "./config";
import {
    credentials,
    errorHandler,
    graphqlHandler,
    rateLimitHandler,
    verifyJWT,
} from "./middlewares";

const app = express();

// Connect to MongoDB
connectDB();

// Can define rate-limiting as a middleware differently for different requests
// Don't define it before serving static files
app.use(rateLimitHandler);

// Add security headers to response
app.use(helmet());

// Compress the response bodies
app.use(compression());

// Prevent MongoDB Operator Injection
app.use(mongoSanitize());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
// app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(verifyJWT);

app.use("/graphql", graphqlHandler);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
        console.log(`Server is running on the port ${PORT}!`);
    });
});
