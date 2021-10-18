import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ProductResolver } from "./modules/resolvers/";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

export async function startServer() {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();

  server.applyMiddleware({ app, path: "/api/graphql" });

  return app;
}
