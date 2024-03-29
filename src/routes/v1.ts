import type { FastifyInstance } from "fastify";

import userController from "../controller/user/user.controller";

export default async function v1Routes(fastify: FastifyInstance) {
  fastify.register(userController, { prefix: "/user" });
}
