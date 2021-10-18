import { createConnection } from "typeorm";
import path from "path";

export async function connect() {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "duvan",
    password: "",
    database: "postgres",
    entities: [path.join(__dirname, "../entity/**/*{.ts,.js}")],
    synchronize: true,
  });
  console.log("Database is connect");
}
