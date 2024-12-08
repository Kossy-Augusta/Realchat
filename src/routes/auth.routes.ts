import express from "express";
import { Request, Response } from "express";
import UserAuth from "../controllers/userAuthController";
const userAuth = new UserAuth

const router = express.Router();

router.post('/create', (req:Request, res: Response)=>{ userAuth.create(req, res)});
router.post('/login', (req:Request, res: Response)=>{ userAuth.login(req, res)});

export default router