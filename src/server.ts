import fastify from "fastify";
import { appRoutes } from "./routes/appRoutes.ts";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify();

app.register(fastifySwagger,{
  swagger: {
    info: {
      title: "API de Pets",
      description: "API para gerenciamento de pets",
      version: "1.0.0",
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});

app.register(appRoutes)
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("server rodando porta 3333");
  });
