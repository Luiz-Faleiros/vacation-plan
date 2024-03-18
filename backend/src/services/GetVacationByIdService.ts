import prismaClient from "../prisma";

// Interface defining the properties for getting a vacation by ID
interface GetVacationByIdProps {
    id: string;
}

class GetVacationByIdService {
    async execute({ id }: GetVacationByIdProps) {
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

        // Return the found vacation
        return findVacation;
    }
}

export { GetVacationByIdService };
