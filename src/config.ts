import { Type } from "@sinclair/typebox";
import { parseEnv } from "./util/env";

export type AppConfig = {
  env: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  session: {
    secret: string;
  };
};

const Environment = Type.Object({
  APP_ENV: Type.String({ default: "development" }),
  PORT: Type.String({ default: "3001" }),
  DB_HOST: Type.String({ default: "localhost" }),
  DB_PORT: Type.String({ default: "5432" }),
  DB_USER: Type.String({ default: "postgres" }),
  DB_PASSWORD: Type.String({ default: "postgres" }),
  DB_NAME: Type.String({ default: "postgres" }),
  SESSION_SECRET: Type.String({ default: "" }),
});

const env = parseEnv(Environment, process.env);

export const appConfig: AppConfig = {
  env: env.APP_ENV,
  port: parseInt(env.PORT),
  db: {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    name: env.DB_NAME,
  },
  session: {
    secret: env.SESSION_SECRET,
  },
};
