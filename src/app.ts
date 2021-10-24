import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ProductResolver } from "./modules/product/produt.resolver";
import { CategoryResolver } from "./modules/category/category.resolver";
import { UserResolver } from "./modules/user/User.resolver";

export async function startServer() {
  const SECRET = "user";

  const app = express();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, CategoryResolver, UserResolver],
      validate: false,
    }),
    introspection: true,
    context: ({ req, res }) => {
      const token = req.headers["authorization"];
      return {
        req,
        res,
        SECRET,
        token,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api/shop/graphql" });

  return app;
}
