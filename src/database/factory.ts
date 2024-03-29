import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { type AppConfig } from "../config";
import { UserSchema } from "./models/user";

export const dbFactory = (dbConfig: AppConfig["db"]) => {
  const client = postgres({
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.name,
    username: dbConfig.user,
    password: dbConfig.password,
  });

  return drizzle(client, {
    schema: {
      users: UserSchema,
    },
  });
};
