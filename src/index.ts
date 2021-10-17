import "reflect-metadata";
import { startServer } from "./app";

const PORT = 4000;

async function main() {
  const app = await startServer();
  app.listen(PORT, () =>
    console.log(`Server on port http://localhost:${PORT}`)
  );
}

main();
