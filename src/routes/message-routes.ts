import express, { Request, Response } from "express";
import MessageController from "../controllers/messagesController";
import verifyJWT from "../middleware/verifyjwt";


const router = express.Router();
const messageController = new MessageController();

router.post('/message/send', verifyJWT, (req: Request, res: Response)=>{
    messageController.sendMessage(req, res);
});

export default router