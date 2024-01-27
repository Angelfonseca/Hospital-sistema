import { connect } from "mongoose";

async function dbConnect(): Promise<void> {
  const DB_URI =
    <string>process.env.URL_MONGO;
  await connect(DB_URI);
}

export default dbConnect;