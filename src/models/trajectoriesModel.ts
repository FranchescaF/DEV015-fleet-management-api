import prisma from "../client";//llamamos a base de datos

export const getTrajectories =async( taxiId: number, date: string )=>{
    // Convertimos la fecha de entrada a UTC estableciendo 00:00:00 del día especificado
    const startDate = new Date(Date.UTC(
        new Date(date).getUTCFullYear(),
        new Date(date).getUTCMonth(),
        new Date(date).getUTCDate(),
        0, 0, 0, 0
    ));

    // Creamos la fecha de fin sumando un día completo y restando un milisegundo
    const endDate = new Date(Date.UTC(
        new Date(date).getUTCFullYear(),
        new Date(date).getUTCMonth(),
        new Date(date).getUTCDate() + 1,
        0, 0, 0, -1
    ));
    console.log(endDate);
    const trajectories = await prisma.trajectories.findMany({
        where: {
            taxi_id: taxiId,  // Conversión de taxiId a entero
            date: {
                gte: startDate, // Fecha y hora de inicio
                lte: endDate // Fecha y hora de fin
            }
        },
        select: {
            id: true,
            taxi_id: true,
            date: true,
            latitude: true,
            longitude: true,
        }
    });
    // Transforma los resultados para ajustarse al formato requerido
    return trajectories.map(trajectory => ({
        id: trajectory.id,
        taxiId: trajectory.taxi_id,
        date: trajectory.date.toISOString(),
        latitude: trajectory.latitude,
        longitude: trajectory.longitude
    }));
} 

// Función que obtiene la información más reciente de cada taxi
export const getLatestTrajectories = async () => {
    const latestTrajectories = await prisma.trajectories.findMany({
        orderBy: {
            date: 'desc', // Ordenar por fecha descendente para obtener las trayectorias más recientes
        },
        distinct: ['taxi_id'], // Evitar duplicados, obteniendo un registro por taxi
        include: {
            taxis: { // Incluir el modelo relacionado taxis
                select: {
                    plate: true, // Seleccionar solo la placa del taxi
                }
            }
        }
    });

    // Transforma los resultados para asegurarte de que se devuelvan en el formato adecuado
    return latestTrajectories.map(trajectory => ({
        taxiId: trajectory.taxi_id,      // taxiId del taxi
        plate: trajectory.taxis.plate,   // Placa obtenida del modelo relacionado taxis
        latitude: trajectory.latitude,   // Latitud de la trayectoria
        longitude: trajectory.longitude, // Longitud de la trayectoria
        timestamp: trajectory.date.toISOString() // Formatear la fecha a string ISO
    }));
};

//Filtrado de fechas:
//gte (greater than or equal): asegura que se incluyan trayectorias desde el inicio del día.
//lte (less than or equal): asegura que se incluyan trayectorias hasta el final del día.