import { FastifyRequest, FastifyReply } from "fastify";
import { GetVacationByIdService } from "../services/GetVacationByIdService";

class GetVacationByIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Extract id from request query
        const { id } = request.query as { id: string };

        // Instantiate GetVacationByIdService
        const vacationService = new GetVacationByIdService();

        // Execute service to get vacation by id
        const vacation = await vacationService.execute({ id });

        // Send response
        reply.send(vacation);
    }
}

export { GetVacationByIdController };
