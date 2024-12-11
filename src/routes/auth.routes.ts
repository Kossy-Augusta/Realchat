import express from "express";
import { Request, Response } from "express";
import UserAuth from "../controllers/userAuthController";
import verifyJWT from "../middleware/verifyjwt";
const userAuth = new UserAuth

const router = express.Router();

router.post('/create', (req:Request, res: Response)=>{ userAuth.create(req, res)});
router.post('/login', (req:Request, res: Response)=>{ userAuth.login(req, res)});
router.get('/logout',verifyJWT, (req:Request, res: Response)=>{ userAuth.logout(req, res)});

export default router