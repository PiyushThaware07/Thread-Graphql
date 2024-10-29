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
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const app = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const port = 8000;
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.json());
    // CREATE GRAPH QL SERVER
    const gqlServer = new server_1.ApolloServer({
        typeDefs: `
            type Query {
                hello: String!
                say(name: String): String
            }
        `,
        resolvers: {
            Query: {
                hello: () => "Hey there, I am a GraphQL server!",
                say: (parent, { name }) => `Hello ${name}`
            }
        }
    });
    yield gqlServer.start();
    app.use('/graphql', (0, express4_1.expressMiddleware)(gqlServer));
    app.get("/", (req, res) => {
        res.json({
            status: "connected",
            message: "Server Running"
        });
    });
    app.listen(port, () => {
        console.log(`server running at http://localhost:${port}`);
    });
});
app();
