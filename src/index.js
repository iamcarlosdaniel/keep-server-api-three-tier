import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./database/connection.js";

async function main() {
  try {
    await connectDB();
    app.listen(PORT);
    console.log(`Listening on port http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
}

main();
