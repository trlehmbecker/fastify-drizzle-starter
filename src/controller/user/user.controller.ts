import type { FastifyInstance } from "fastify";

import { createUser, findAllUsers } from "./handlers";

export default async function userController(fastify: FastifyInstance) {
  fastify.register(createUser);
  fastify.register(findAllUsers);
}
