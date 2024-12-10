import { Request, Response } from "express";

export default interface ChatManagementInterface {
    getAllChats(req: Request, res: Response): Promise<Response>;
    // getChatHistory(req: Request, res: Response): Promise<Response>,
}
