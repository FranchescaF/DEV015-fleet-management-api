import { Request, Response } from 'express';
import prisma from '../client';

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
      const user = await prisma.users.create({
        data: { name, email, password },
      });
      res.status(201).json(user);
      console.log(req.body);
    } catch (error) {
      res.status(500).json({ error: 'Error creando el usuario' });
    }
  };
  
  // Leer todos los usuarios
  export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const skip = (page - 1) * limit;
  
      const users = await prisma.users.findMany({
        skip: skip,
        take: limit,
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo los usuarios' });
    }
  };
  
  // Leer un usuario por ID
  export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await prisma.users.findUnique({ where: { id: Number(id) } });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo el usuario' });
    }
  };
  
  // Actualizar un usuario
  export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const user = await prisma.users.update({
        where: { id: Number(id) },
        data: { name, email, password },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error actualizando el usuario' });
    }
  };
  
  // Eliminar un usuario
  export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await prisma.users.delete({ where: { id: Number(id) } });
      res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error eliminando el usuario' });
    }
  };