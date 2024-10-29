import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';



const app = async () => {
    const app = express();
    const port: number = 8000;

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());


    // CREATE GRAPH QL SERVER
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String!
                say(name: String): String
            }
        `,
        resolvers: {
            Query: {
                hello: () => "Hey there, I am a GraphQL server!",
                say: (parent, { name }: { name: string }) => `Hello ${name}`
            }
        }
    })
    await gqlServer.start();

    app.use('/graphql', expressMiddleware(gqlServer));
    app.get("/", (req, res) => {
        res.json({
            status: "connected",
            message: "Server Running"
        })
    })

    app.listen(port, () => {
        console.log(`server running at http://localhost:${port}`);
    })

}
app();