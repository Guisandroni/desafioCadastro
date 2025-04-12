import { FastifyInstance } from "fastify";
import { deletePet, listPets,  registerPet,  updatePet } from "./services/pet.ts";

export const appRoutes = (app: FastifyInstance) => {
  app.post("/animals/pet/register", registerPet);
  app.delete('/animals/pet/:id', deletePet)
  app.put('/animals/pet/:id', updatePet)
  app.post('/animals/pet/update/:id', updatePet)
  app.get('/animals/pet', listPets)
};
