"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateScalar = void 0;
const graphql_1 = require("graphql");
exports.dateScalar = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type (returns date only in YYYY-MM-DD format)',
    serialize(value) {
        if (value instanceof Date) {
            return value.toISOString().split('T')[0];
        }
        if (typeof value === 'string') {
            const date = new Date(value);
            return date.toISOString().split('T')[0];
        }
        return null;
    },
    parseValue(value) {
        if (typeof value === 'string' || typeof value === 'number') {
            return new Date(value);
        }
        return null;
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    }
});
