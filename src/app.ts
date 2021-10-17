import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PingResolver } from "./modules/resolvers/ping";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

export async function startServer() {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();

  server.applyMiddleware({ app, path: "/api/graphql" });

  return app;
}
