import { CustomGraphQLFormattedError, formatError } from "graphql";
import { graphqlHTTP } from "express-graphql";

import { HttpError } from "../interfaces/HttpError";
import graphqlSchema from "../graphql/schemas";
import graphqlResolver from "../graphql/resolvers";
import { httpStatusNames, httpStatusTypes } from "../utils/httpStatus";

const graphqlHandler = graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn: (err): CustomGraphQLFormattedError => {
        // Allows to return our own format of error
        // return formatError(err); // The default format

        if (!err.originalError) {
            // Set by express-graphql when it detects error thrown in code either by you or some third party package
            // For technical errors, it wont have original error field
            return formatError(err);
        }

        const ise = httpStatusTypes[httpStatusNames.INTERNAL_SERVER_ERROR];
        const message = err.message || ise.message;
        const originalError = err.originalError as HttpError;
        const data = originalError.data;
        const status = originalError.status || ise.status;
        return {
            message,
            status,
            data,
        };
    },
});

export default graphqlHandler;
