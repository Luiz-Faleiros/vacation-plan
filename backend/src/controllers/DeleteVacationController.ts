import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteVacationService } from "../services/DeleteVacationService";

class DeleteVacationController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Extract id from request query
        const { id } = request.query as { id: string };

        // Instantiate DeleteVacationService
        const vacationService = new DeleteVacationService();

        // Execute service to delete vacation
        const vacation = await vacationService.execute({ id });

        // Send response
        reply.send(vacation);
    }
}

export { DeleteVacationController };
