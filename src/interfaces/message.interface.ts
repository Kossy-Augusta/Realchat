import { Request, Response } from "express";

export default interface ChatManagementInterface{
    sendMessage(req: Request, res: Response): Promise<Response>,
}