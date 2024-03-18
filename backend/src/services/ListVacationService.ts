import { PrismaClient } from "@prisma/client";
import prismaClient from "../prisma";

class ListVacationService {
    async execute() {
        try {
            // Use the Prisma client to retrieve all vacations'
            const vacations = await prismaClient.vacation.findMany();

            // Return the found vacations
            return vacations;
        } catch (error) {
            // Handle errors, if any
            console.error('Error listing vacations:', error);
            throw error; // Re-throw the error for further handling, if needed
        }
    }
}

export { ListVacationService }
