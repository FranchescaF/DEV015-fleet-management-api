import { Request, Response } from 'express';
import prisma from '../client';
import { createUser, getUsers, updateUser, deleteUser } from '../models/usersModels';


// Crear un nuevo usuario--POST
export const createUserController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      if(!name || !email || !password){
        return res.status(400).json({error: 'Debes llenar todos los datos del usuario'})
      }

      const emailValidation = await prisma.users.findUnique({
        where:{
          email: email,
        }
    });
    if (emailValidation) {
      return res.status(409).json({ error: 'Ya existe un usuario con el mismo email' });
  }
    const crypPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, crypPassword);
    const newUserResponse = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
    };
    res.status(201).json(newUserResponse);
    } catch (error) {
        res.status(500).json({ error: 'Error creando el usuario' });
    }
  };
  
// Leer todos los usuarios--GET
export const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
      const { page = 1, limit = 10 } = req.query;
      const pages = parseInt(page as string, 10);
      const limits = parseInt(limit as string, 10);

      const users = await getUsers(pages, limits);
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: 'Error obteniendo los usuarios' });
  }
};
  
// Actualizar un usuario--PATCH
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      const { name, email } = req.body;

      if (!name && !email) {
          return res.status(400).json({ error: 'No se puede modificar correo ni contraseña' });
      }

      const user = await prisma.users.findUnique({
          where: { id: Number(id) }
      });

      if (!user) {
          return res.status(404).json({ error: 'El usuario no existe' });
      }

      const updatedUser = await updateUser(Number(id), null, name || user.name);
      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(500).json({ error: 'Error actualizando el usuario' });
  }
};

  
  // Eliminar un usuario--DELETE
  export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const user = await prisma.users.findUnique({
            where: { id: Number(id) }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await deleteUser(Number(id), null);
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando el usuario' });
    }
};
