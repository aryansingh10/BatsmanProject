import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

export const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type (returns date only in YYYY-MM-DD format)',
    serialize(value: unknown): string | null {
        if (value instanceof Date) {
            return value.toISOString().split('T')[0];
        }
        if (typeof value === 'string') {
            const date = new Date(value);
            return date.toISOString().split('T')[0];
        }
        return null;
    },
    parseValue(value: unknown): Date | null {
        if (typeof value === 'string' || typeof value === 'number') {
            return new Date(value);
        }
        return null;
    },
    parseLiteral(ast: ValueNode): Date | null {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    }
});
