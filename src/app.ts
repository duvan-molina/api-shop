import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ProductResolver } from "./modules/product/produt.resolver";
import { CategoryResolver } from "./modules/category/category.resolver";

export async function startServer() {
  const app = express();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, CategoryResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();

  server.applyMiddleware({ app, path: "/api/shop/graphql" });

  return app;
}
