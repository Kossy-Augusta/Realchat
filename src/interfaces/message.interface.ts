import { Request, Response } from "express";

export default interface MessageManagementInterface{
    sendMessage(req: Request, res: Response): Promise<Response>,
}