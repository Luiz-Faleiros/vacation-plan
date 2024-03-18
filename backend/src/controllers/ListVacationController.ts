import { FastifyRequest, FastifyReply } from "fastify";
import { ListVacationService } from "../services/ListVacationService";

class ListVacationController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Instantiate ListVacationService
            const listVacationService = new ListVacationService();
            
            // Execute service to list vacations
            const vacations = await listVacationService.execute();

            // Send response with list of vacations
            reply.send(vacations);
        } catch (error) {
            // Handle errors
            reply.status(500).send({ error: 'Internal server error' });
            console.error('Error handling request:', error);
        }
    }
}

export { ListVacationController }
