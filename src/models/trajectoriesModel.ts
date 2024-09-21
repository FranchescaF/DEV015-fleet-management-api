import prisma from "../client";//llamamos a base de datos

export const getTrajectories =async({ taxiId, date }: { taxiId: number, date: string })=>{
    return await prisma.trajectories.findMany({
        where: {
            taxi_id: taxiId,
            date: {
                gte: new Date(date), // Filtra desde el inicio de la fecha
                lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) // Hasta el final del día
            }
        },
        select: {
            latitude: true,
            longitude: true,
        }
    });
} 