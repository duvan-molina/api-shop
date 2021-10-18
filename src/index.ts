import "reflect-metadata";
import { startServer } from "./app";
import { connect } from "./config/db";

const PORT = 4000;

async function main() {
  connect();
  const app = await startServer();
  app.listen(PORT, () =>
    console.log(`Server on port http://localhost:${PORT}`)
  );
}

main();
