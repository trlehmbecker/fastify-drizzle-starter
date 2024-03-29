import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { type FastifyInstance } from "fastify";
import { db } from "../../../database";

export const findAllUsers = async (fastify: FastifyInstance) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get("/", async (request, reply) => {
      const users = await db.query.users.findMany();
      reply.status(200).send(users);
    });
};
