import {UserController} from './../controller/UserController';
import {Router} from 'express';
import {checkJwt} from './../middlewares/jwt';
import {checkRole} from './../middlewares/role';

const router = Router();

router.get('/',[checkJwt, checkRole(['Admin'])], UserController.getAll);

router.get('/:id',[checkJwt, checkRole(['Admin'])], UserController.getById);

router.post('/',[checkJwt, checkRole(['Admin'])], UserController.newUser);

router.patch('/:id',[checkJwt, checkRole(['Admin'])], UserController.editUser);

router.delete('/:id',[checkJwt, checkRole(['Admin'])], UserController.deleteUser);

export default router;