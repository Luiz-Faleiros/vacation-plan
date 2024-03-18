import prismaClient from "../prisma";

// Interface defining the properties for creating a vacation
interface CreateVacationProps {
    title: string;
    description: string;
    location: string;
    participants: string;
    dateAt: string;
}

class CreateVacationService {
    async execute({ title, description, location, participants, dateAt }: CreateVacationProps) {
        // Check if all required fields are provided
        if (!title || !description || !location || !dateAt) {            
            throw new Error("Fill in all fields");
        }

        // Create a new vacation using Prisma
        const vacation = await prismaClient.vacation.create({
            data: {
                title,
                description,
                location,
                participants,
                dateAt
            }
        });
        
        // Return the created vacation
        return vacation;
    }
}

export { CreateVacationService };
