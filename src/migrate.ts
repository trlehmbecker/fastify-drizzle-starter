import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { AppConfig, appConfig } from "./config";

const migrateDb = async (dbConfig: AppConfig["db"]) => {
  const client = postgres({
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.name,
    username: dbConfig.user,
    password: dbConfig.password,
  });

  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "migrations" });
  await client.end();
};

migrateDb(appConfig.db);
