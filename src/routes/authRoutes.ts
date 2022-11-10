import express, { Router } from "express";
import {AuthenticationController} from "../controllers/Authentication";

const router: Router = express.Router();

router.get("/kudaToken", AuthenticationController.getKudaAuthToken);

export default router;
