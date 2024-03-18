import { FastifyRequest, FastifyReply } from "fastify";
import { CreateVacationService } from "../services/CreateVacationService";

class CreateVacationController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Extract data from request body
        const { title, description, location, participants, dateAt } = request.body as {
            title: string,
            description: string,
            location: string,
            participants: string,
            dateAt: string
        };

        // Instantiate CreateVacationService
        const vacationService = new CreateVacationService();

        // Execute service to create vacation
        const vacation = await vacationService.execute({ title, description, location, participants, dateAt });

        // Send vacation data in response
        reply.send(vacation);
    }
}

export { CreateVacationController };
