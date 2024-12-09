import express, { Request, Response } from "express";
import MessageController from "../controllers/messagesController";


const router = express.Router();
const messageController = new MessageController();

router.post('/message/send', (req: Request, res: Response)=>{
    messageController.sendMessage(req, res);
});

export default router