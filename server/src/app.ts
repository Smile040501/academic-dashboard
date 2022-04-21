import express, {
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler,
} from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";

import graphqlSchema from "./graphql/schemas";
import graphqlResolver from "./graphql/resolvers";

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    return next();
});

app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        // customFormatErrorFn(err) {
        //     //* 4
        //     // Allows to return our own format of error
        //     // return err; // The default format

        //     if (!err.originalError) {
        //         // Set by express-graphql when it detects error thrown in code either by you or some third party package
        //         // For technical errors, it wont have original error field
        //         return err;
        //     }

        //     const data = err.originalError.data;
        //     const message = err.message || "An error occurred";
        //     const code = err.originalError.code || 500;
        //     return {
        //         message,
        //         status: code,
        //         data,
        //     };
        // },
    })
);

const errorHandler: ErrorRequestHandler = (err, _, res, _2) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({ message, data });
};

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

(async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.msj10.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

            // `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.w9yxw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        );
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();
