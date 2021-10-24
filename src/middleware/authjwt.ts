import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

export const verifyToken = async ({ context }: any, next: any) => {
  const token = context.req.headers["authorization"];

  if (!token) return context.res.json({ message: "No token provided" });
  const decode = jwt.verify(token, context.SECRET);


  const user = await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    // @ts-ignore
    .where("user.id = :id", { id: decode.id })
    .getOne();

  if (!user) return context.res.json({ message: "no user found" });

  await next();
};

// export const verifyToken: MiddlewareFn = async ({ context }, next) => {
//   const token = req.headers["Authorization"];

//   if (!token) return context.res.json({ message: "No token provided" });
//   const decode = jwt.verify(token, context.SECRET);

//   const user = await getConnection()
//     .createQueryBuilder()
//     .select("user")
//     .from(User, "user")
//     // @ts-ignore
//     .where("user.id = :id", { id: decode.id })
//     .getOne();

//   if (!user) return context.res.json({ message: "no user found" });

//   await next();
// };

