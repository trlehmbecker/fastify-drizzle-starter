import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { users } from "./schema";

export const InsertUserSchema = createInsertSchema(users);
export const SelectUserSchema = createSelectSchema(users);
