import { appConfig } from "../config";
import { dbFactory } from "./factory";

export * from "./factory";

// Singleton
export const db = dbFactory(appConfig.db);
