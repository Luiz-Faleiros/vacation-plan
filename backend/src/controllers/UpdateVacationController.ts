import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateVacationService } from "../services/UpdateVacationService"; // Fixed service name

class UpdateVacationController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Log the request
        console.log(request);
        
        try {
            // Extract data from request body
            const { id ,title, description, location, participants, dateAt } = request.body as { id: string, title: string, description: string, location: string, participants: string, dateAt: string };

            // Instantiate UpdateVacationService
            const vacationService = new UpdateVacationService(); 

            // Execute service to update vacation
            const vacation = await vacationService.execute({ id, title, description, location, participants, dateAt });

            // Send response with updated vacation
            reply.send(vacation);
        } catch (error) {
            // Handle errors
            console.error("Error occurred while updating vacation:", error);
            reply.code(500).send({ error: "Internal server error" });
        }
    }
}

export { UpdateVacationController };
