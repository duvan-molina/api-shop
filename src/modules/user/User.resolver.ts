import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import { encryptPassword } from "../../utilis";
import IContext from "../shared/types/ctx.type";
import jwt from "jsonwebtoken";
import CreateUser from "./types/User.input";
import ResponseType from "./types/Response.type";
import UserType from "./types/User.type";
import { verifyToken } from "../../middleware";

@Resolver()
export class UserResolver {
  @Mutation(() => ResponseType, { description: "loggin" })
  async login(
    @Arg("email") email: String,
    @Arg("password") password: String,
    @Ctx() ctx: any
  ): Promise<ResponseType | undefined> {
    const user = await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.email = :email", { email })
      .getOne();

    if (!user) {
      return {
        success: false,
        errors: [{ path: "email", message: "Email no existe" }],
      };
    }

    const validPassword = await bcrypt.compare(`${password}`, user?.password);
    if (!validPassword) {
      return {
        success: false,
        errors: [{ path: "password", message: "Password inválido" }],
      };
    }

    const token = jwt.sign({ id: user?.id }, ctx.SECRET, {
      expiresIn: "1d",
    });

    return {
      success: true,
      errors: [],
      token,
      user: user,
    };
  }

  @Mutation(() => UserType)
  @UseMiddleware(verifyToken)
  async getMe(@Ctx() ctx: IContext): Promise<UserType | undefined> {
    const decode = jwt.verify(ctx.token, ctx.SECRET);
    const user = await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .leftJoinAndSelect("user.addresses", "addresses")
      .leftJoinAndSelect("user.contacts", "contacts")
      //@ts-ignore
      .where("user.id = :id", { id: decode.id })
      .getOne();

    return user;
  }

  @Mutation(() => ResponseType, { description: "Create user" })
  async createUser(
    @Arg("user", () => CreateUser) user: CreateUser,
    @Ctx() ctx: IContext
  ): Promise<ResponseType> {
    const userFound = await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.email = :email", { email: user.email })
      .getOne();

    if (userFound) {
      return {
        success: false,
        errors: [{ path: "email", message: "Email ya existe" }],
      };
    }

    const newUser = User.create({
      ...user,
      password: await encryptPassword(user.password),
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser.id }, ctx.SECRET, {
      expiresIn: "1d",
    });

    return {
      success: true,
      token,
      errors: [],
      user: newUser,
    };
  }
}