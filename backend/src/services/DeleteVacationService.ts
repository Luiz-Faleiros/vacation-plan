import prismaClient from "../prisma";

// Interface defining the properties for deleting a vacation
interface DeleteVacationProps {
    id: string;
}

class DeleteVacationService {
    async execute({ id }: DeleteVacationProps) {
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
            throw new Error("Plan does not exist!");
        }

        // Delete the found vacation
        await prismaClient.vacation.delete({
            where: {
                id: findVacation.id
            }
        });

        // Return success message
        return { message: 'Successfully deleted' };
    }
}

export { DeleteVacationService };
