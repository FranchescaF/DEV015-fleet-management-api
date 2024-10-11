//las consultas con la base de datos, todo lo que esta ne la base de datos
import prisma from "../client";//llamamos a base de datos

// Crear un nuevo usuario--POST
export const createUser = (name:string, email:string, password:string) => {
   return prisma.users.create({
    data:{
      name,
      email,
      password
    }
   })
};
  
// Leer todos los usuarios--GET
export const getUsers = async (page: number, limit:number) => {
  return await prisma.users.findMany({
    skip: (page-1)*limit,
    take: limit
  })
};
  
// Actualizar un usuario--PATCH
export const updateUser = (userId: number | null, userEmail: string | null, userName: string) => {
  let searchParams: {id?:number, email?:string} = {};
  if(userId){
    searchParams.id = userId;
  } else if (userEmail){
    searchParams.email = userEmail;
  } else {
    throw new Error ('id o email invalidos')
  }
    return prisma.users.update({
      where: searchParams as {id:number} | {email: string},
      data: {
        name: userName
      }
    })
};
  
  // Eliminar un usuario --DELETE 
  export const deleteUser = (userId: number | null, userEmail: string | null) => {
    let searchParams: { id?: number, email?: string} = {};
    if(userId){
      searchParams.id = userId;
    } else if (userEmail) {
      searchParams.email = userEmail;
    } else {
      throw new Error('id o email invalidos')
    }

    return prisma.users.delete({
      where: searchParams as {id: number} | {email:string},
    })
  };
