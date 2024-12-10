import { Request, Response } from "express";

export default interface MessageManagementInterface{
    index(req: Request, res: Response): Promise<Response>,
    store(req: Request, res: Response): Promise<Response>,
}