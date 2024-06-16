import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { routes } from './routes';

const app = Fastify({ logger: true });

const port = process.env.PORT || 3333;

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(cors);

  await app.register(swagger, {
    swagger: {
      info: {
        title: 'Fastify API',
        description: 'API documentation for the Fastify server',
        version: '1.0.0'
      },
      host: 'localhost:3333',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    }
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next(); },
      preHandler: function (request, reply, next) { next(); },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
    transformSpecificationClone: true,
  });

  await app.register(routes);

  try {
    await app.listen({ port: parseInt(port.toString(), 10), host: '0.0.0.0' }, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
