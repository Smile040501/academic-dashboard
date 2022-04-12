import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";

import graphqlSchema from "./graphql/schemas";
import graphqlResolver from "./graphql/resolvers";

const app = express();

app.use(bodyParser.json());

app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
    })
);

const PORT = process.env.PORT || 3000;

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
