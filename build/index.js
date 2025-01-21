"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const schema_1 = __importDefault(require("./graphql/schema"));
const resolvers_1 = require("./graphql/resolvers");
const sequilize_1 = __importDefault(require("./database/sequilize"));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        try {
            yield sequilize_1.default.authenticate();
            console.log('Database connected successfully.');
            yield sequilize_1.default.sync({ alter: true });
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
        // Apollo Server setup
        const gqlServer = new server_1.ApolloServer({
            typeDefs: schema_1.default,
            resolvers: resolvers_1.resolvers
        });
        yield gqlServer.start();
        app.use('/graphql', (0, express4_1.expressMiddleware)(gqlServer));
        app.listen(3000, () => {
            console.log('Server started on http://localhost:3000/graphql');
        });
    });
}
init();
