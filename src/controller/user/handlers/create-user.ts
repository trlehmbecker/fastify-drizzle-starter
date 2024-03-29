import { Type, TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { type FastifyInstance } from "fastify";
import { InsertUserSchema } from "../../../database/models/user";
import { db } from "../../../database";
import { users } from "../../../database/schema";
import { eq } from "drizzle-orm";

export const createUser = async (fastify: FastifyInstance) => {
  const schema = {
    body: Type.Pick(InsertUserSchema, ["name", "email"]),
  };

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post("/", { schema }, async (request, reply) => {
      const { name, email } = request.body;
      const results = await db
        .insert(users)
        .values({ name, email })
        .returning({ insertedId: users.id });

      const userId = results[0].insertedId;

      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      reply.code(201).send(user);
    });
};
