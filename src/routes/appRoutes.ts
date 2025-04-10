import { FastifyInstance } from "fastify";
import { registerPet } from "./services/pet.ts";

export const appRoutes = (app: FastifyInstance) => {
  app.get("/register", registerPet);
};
