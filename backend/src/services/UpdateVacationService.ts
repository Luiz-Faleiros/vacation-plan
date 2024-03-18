import prismaClient from "../prisma";

// Interface defining the properties for updating vacations
interface UpdateVacationsProps {
    id: string;
    title: string;
    description: string;
    location: string;
    participants: string;
    dateAt: string;
}

class UpdateVacationService {
    async execute({ id, title, description, location, participants, dateAt }: UpdateVacationsProps) {
        try {
            // Check if ID is provided
            if (!id) {
                throw new Error("Invalid request");
            }

            // Find the vacation with the provided ID
            const findVacation = await prismaClient.vacation.findFirst({
                where: {
                    id: id
                }
            });

            // If vacation not found, throw error
            if (!findVacation) {
                throw new Error("Plan not found!");
            }

            // Update the vacation with new data
            await prismaClient.vacation.update({
                where: {
                    id: id
                },
                data: {
                    title,
                    description,
                    location,
                    participants,
                    dateAt
                }
            });

            // Return success message
            return { message: 'Plan updated successfully' };
        } catch (error) {
            // Throw error if any occurred during update process
            throw new Error('Error updating client');
        }
    }
}

export { UpdateVacationService };
