import { Request, Response } from "express";
import { handleError, handleSuccess } from "../utils/responseHandler";
import ChatManagementInterface from "../interfaces/chat.interface"; 
import prisma from "../utils/clients";

export default class ChatController implements ChatManagementInterface{
    async getAllChats(req: Request, res: Response): Promise<Response> {
        const userEmail = req.userInfo?.email;
        if(!userEmail) return handleError(res, 401, "Unauthorized Access");
        const currentUser = await prisma.user.findFirst({
            where: {
                email: userEmail
            }
        });
        if(!currentUser) return handleError(res, 400, "User does not exist");
        const userChats = await prisma.chat.findMany({
            where:{
                users: {
                    some: {user_id: currentUser.id}
                },
            }
        })
        const data: object = {...userChats}
        return handleSuccess(res, 200, "All chats", data);
    }
}

