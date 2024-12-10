import { Request, Response } from "express";
import { handleError, handleSuccess } from "../utils/responseHandler";
import ChatManagementInterface from "../interfaces/chat.interface"; 
import prisma from "../utils/clients";

export default class ChatController implements ChatManagementInterface{
    async getAllChats(req: Request, res: Response): Promise<Response> {
        // check the request obbject if it contains userInfo which is added during token verification
        const userEmail = req.userInfo?.email;
        if(!userEmail) return handleError(res, 401, "Unauthorized Access");
        // use the email fro userInfo to verify if the user exists
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
            },
            include: {
                users: true
            }
        })
        // format the response to return the chat id and user_id of the chart participant
        const formattedChats = userChats.map(chats =>{
            return {
                id: chats.id,
                chatParticipants: chats.users
                .filter(user => user.user_id !== currentUser.id)
                .map(user =>({
                    user_id: user.user_id
                }))
            };
        });
        return handleSuccess(res, 200, "All chats", formattedChats);
    }
}

