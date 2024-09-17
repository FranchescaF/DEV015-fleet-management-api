import prisma from "../client";//llamamos a base de datos

export const getTaxis =async({ plate, page, limit }: { plate?: string, page: number, limit: number })=>{
    // Validación de los parámetros page y limit
    const pageNumber = Math.max(page, 1);  // Asegura que la página sea al menos 1
    const limitNumber = Math.max(limit, 1); // Asegura que el límite sea al menos 1
    // Condición para el filtro de placa
    const findPlate = plate ? { plate: { contains: plate }} : {};
    return await prisma.taxis.findMany({
        where: findPlate,   // Filtrar por placa, si se proporciona
        skip: (pageNumber - 1) * limitNumber,  // Saltar registros según la página
        take: limitNumber   // Limitar los resultados por página
    })
} 
