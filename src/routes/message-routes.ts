import express, { Request, Response } from "express";
import MessageController from "../controllers/messageController";
import verifyJWT from "../middleware/verifyjwt";


const router = express.Router();
const messageController = new MessageController();

router.post('/message/store', verifyJWT, (req: Request, res: Response)=>{
    messageController.store(req, res);
});
router.get('/message/:chat_id', verifyJWT, (req: Request, res: Response)=>{
    messageController.index(req, res);
});

export default router