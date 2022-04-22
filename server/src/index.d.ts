import jwt from "jsonwebtoken";
import graphql from "graphql";

declare module "jsonwebtoken" {
    export interface AuthorizationJWTPayload extends jwt.JwtPayload {
        email: string;
    }
}

declare module "graphql" {
    export interface CustomGraphQLFormattedError
        extends graphql.GraphQLFormattedError {
        status?: number;
        data?: any;
    }
}
