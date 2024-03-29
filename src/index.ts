import Fastify, { type FastifyInstance } from "fastify";
import { appConfig } from "./config";
import v1 from "./routes/v1";

export async function createServer(): Promise<FastifyInstance> {
  const fastify: FastifyInstance = Fastify({});
  fastify.decorate("config", appConfig);

  // Register routes
  fastify.register(v1, { prefix: "/v1" });

  await fastify.ready();
  return fastify;
}

export async function start(): Promise<void> {
  const fastify = await createServer();

  try {
    await fastify.listen({
      port: Number(appConfig.port),
      host: "0.0.0.0",
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
