import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { CreateVacationController } from './controllers/CreateVacationController';
import { ListVacationController } from './controllers/ListVacationController';
import { DeleteVacationController } from './controllers/DeleteVacationController';
import { UpdateVacationController } from './controllers/UpdateVacationController';
import { GetVacationByIdController } from './controllers/GetVacationByIdController';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/postVacation', {
    schema: {
      description: 'Create a new vacation',
      tags: ['Vacation'],
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          location: { type: 'string' },
          participants: { type: 'string' },
          dateAt: { type: 'string', format: 'date' }
        },
        required: ['title', 'description', 'location', 'participants', 'dateAt']
      },
      response: {
        200: {
          description: 'Vacation created successfully',
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            location: { type: 'string' },
            participants: { type: 'string' },
            dateAt: { type: 'string', format: 'date' }
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateVacationController().handle(request, reply);
  });

  fastify.get('/getVacations', {
    schema: {
      description: 'Get all vacations',
      tags: ['Vacation'],
      response: {
        200: {
          description: 'List of vacations',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              location: { type: 'string' },
              participants: { type: 'string' },
              dateAt: { type: 'string', format: 'date' }
            }
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListVacationController().handle(request, reply);
  });

  fastify.delete('/deleteVacation', {
    schema: {
      description: 'Delete a vacation',
      tags: ['Vacation'],
      querystring: {
        id: { type: 'string' }
      },
      response: {
        200: {
          description: 'Vacation deleted successfully',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteVacationController().handle(request, reply);
  });

  fastify.put('/updateVacation', {
    schema: {
      description: 'Update a vacation',
      tags: ['Vacation'],
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          location: { type: 'string' },
          participants: { type: 'string' },
          dateAt: { type: 'string', format: 'date' }
        },
        required: ['id']
      },
      querystring: {
        id: { type: 'string' }
      },
      response: {
        200: {
          description: 'Vacation updated successfully',
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            location: { type: 'string' },
            participants: { type: 'string' },
            dateAt: { type: 'string', format: 'date' }
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateVacationController().handle(request, reply);
  });

  fastify.get('/getVacationById', {
    schema: {
      description: 'Get a vacation by ID',
      tags: ['Vacation'],
      querystring: {
        id: { type: 'string' }
      },
      response: {
        200: {
          description: 'Vacation details',
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            location: { type: 'string' },
            participants: { type: 'string' },
            dateAt: { type: 'string', format: 'date' }
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetVacationByIdController().handle(request, reply);
  });
}
