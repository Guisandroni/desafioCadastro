// - Cadastrar um novo pet
// - Buscar dados do pet cadastrado
// - Deletar um pet cadastrado
// - Listar todos os pets cadastrados
// - Listar pets por algum critério (idade, nome, raça)

// id        String    @id @default(uuid())
// nome      String
// sobrenome String
// idade     Int
// raca      String
// sexo      AnimalSexo
// endereco  String
// peso

import { prisma } from "@src/lib/repository.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const registerPet = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const sexoEnum = z.enum(["Macho", "Femea"]);
  const paramsRegisterPet = z.object({
    nome: z.string(),
    sobrenome: z.string(),
    idade: z.number(),
    raca: z.string(),
    sexo: sexoEnum,
    endereco: z.string(),
    peso: z.number(),
  });
  const { nome, sobrenome, idade, raca, sexo, endereco, peso } =
    paramsRegisterPet.parse(request.body);
  await prisma.animals.create({
    data: {
      nome,
      sobrenome,
      idade,
      raca,
      sexo,
      endereco,
      peso,
    },
  });

  return reply.status(201).send();
};

export const listPets = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const data = await prisma.animals.findMany();

  return reply.status(200).send({ data });
};

export const deletePet = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const paramsDeletePet = z.object({
    id: z.string(),
  });
  const { id } = paramsDeletePet.parse(request.params);

  await prisma.animals.delete({
    where: {
      id:id,
    },
  });
  return reply.status(200).send({ message: "Pet deletado" });
};

export const updatePet = async (request:FastifyRequest, reply:FastifyReply) => {
  const sexoEnum = z.enum(["Macho", "Femea"]);
  const paramsUpdatePet = z.object({
    nome: z.string(),
    sobrenome: z.string(),
    idade: z.number(),
    raca: z.string(),
    sexo: sexoEnum,
    endereco: z.string(),
    peso: z.number(),
  });

  const idParamsPet = z.object({
    id: z.string(),
  })

  const {id} = idParamsPet.parse(request.params)

  const updatePets = paramsUpdatePet.parse(request.body);

  await prisma.animals.update({
    where: {
      id:id,
    },
    data:updatePets
  });

  return reply.status(200).send({ message: "pet atualizado" });
};
