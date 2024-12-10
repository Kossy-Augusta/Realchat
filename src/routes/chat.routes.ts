import express, { Request, Response } from "express";
import verifyJWT from "../middleware/verifyjwt";
import ChatController from "../controllers/chatController";

const router = express.Router();
const chatController = new ChatController()

router.get("/chat/all-chats", verifyJWT, (req: Request, res: Response) => {
  chatController.getAllChats(req, res);
});

export default router;
