import { Router } from 'express';
import { createUserController, getUsersController, updateUserController, deleteUserController } from '../controllers/usersController';

const router = Router();

router.post('/users', createUserController); // Crear un nuevo usuario
router.get('/users', getUsersController); // Leer todos los usuarios
router.patch('/users/:id', updateUserController); // Actualizar un usuario
router.delete('/users/:id', deleteUserController); // Eliminar un usuario

export default router;