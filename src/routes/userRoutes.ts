import express, { Router } from 'express';
import {UserController} from "../controllers/userController";;

const router: Router = express.Router();

router.get('/get',
    UserController.getAllUsers );

router.get('/get/:userId',
    UserController.getSingleUser );

router.post('/create',
    UserController.createNewUser );

router.put('/update/:userId',
    UserController.updateUserInfo );

router.put('/delete/:userId',
    UserController.deleteItem )


export default router;


