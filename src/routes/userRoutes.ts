import express, { Router } from 'express';
// import { body, query } from 'express-validator';

import {UserController} from "../controllers/userController";
import {lookupValidator} from "../helpers/Validator";

const router: Router = express.Router();

router.get('/getall',
    UserController.getAllUsers )

router.get('/getone',
    UserController.getSingleUser )


export default router;
