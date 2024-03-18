import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateVacationController } from "./controllers/CreateVacationController";
import { ListVacationController } from "./controllers/ListVacationController";
import { DeleteVacationController } from "./controllers/DeleteVacationController";
import { UpdateVacationController } from "./controllers/UpdateVacationController";
import { GetVacationByIdController } from "./controllers/GetVacationByIdController";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post('/postVacation', async(request: FastifyRequest, reply: FastifyReply) => {
        return new CreateVacationController().handle(request, reply)
    })

    fastify.get('/getVacations', async(request: FastifyRequest, reply: FastifyReply) => {
        return new ListVacationController().handle(request, reply)
    })

    fastify.delete('/deleteVacation', async(request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteVacationController().handle(request, reply)
    })

    fastify.put('/updateVacation', async(request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateVacationController().handle(request, reply)
    })

    fastify.get('/getVacationById', async(request: FastifyRequest, reply: FastifyReply) => {
        return new GetVacationByIdController().handle(request, reply)
    })
}