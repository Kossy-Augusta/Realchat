import { Request, Response } from "express";
import ChatManagementInterface from "../interfaces/message.interface";
import { sendNewMessageSchema } from "../validations/message-validation";
import { handleError, handleSuccess } from "../utils/responseHandler";
import prisma from "../utils/clients";
import { MessageType } from "@prisma/client";

export default class MessageController implements ChatManagementInterface{
    async sendMessage(req: Request, res: Response): Promise<Response> {
        const {error, value} = sendNewMessageSchema.validate(req.body);

        if (error) return handleError(res, 400, error.details[0].message);

        try {
            // check if users exit
            const UserExists = await prisma.user.findMany({
                where:{
                    id: { in: [value.sender_id, value.reciever_id] },
                }
            });
            const userIds = UserExists.map(user => user.id);
            if(!userIds.includes(value.sender_id)) return handleError(res, 400, `User with id ${value.sender_id} does not exist`)
            if(!userIds.includes(value.reciever_id)) return handleError(res, 400, `User with id ${value.reciever_id} does not exist`)
            // check if chat exists between users
            const existingChat = await prisma.chat.findFirst({
                where: {
                    AND: [
                            {
                                users: {
                                    some: { user_id: value.sender_id },
                                },
                            },
                            {
                                users: {
                                    some: { user_id: value.reciever_id },
                                },
                            },
                    ],
                },
                include: {
                    users: true, // Include related users if needed
                }
            });
            let chatId: number;
            if (!existingChat){
                // create new chat
                const newChat = await prisma.chat.create({
                    data: {}
                    });
                chatId = newChat.id;
                //  create relationship between users  an chat
                await prisma.chatsToUsers.createMany({
                    data: [
                        { user_id: value.sender_id, chat_id: chatId },
                        { user_id: value.reciever_id, chat_id: chatId }
                    ]
                });
            }
            else{
                chatId = existingChat.id;
            }
            // to do later: in else block, check if the length of users in chat is more than 2, then handle group chat
            const newMessage = await prisma.message.create({
                    data: {
                        sender:{
                            connect: {id: value.sender_id}
                        },
                        reciever: {
                            connect: {id: value.reciever_id}
                        },
                        chat: {
                            connect: {id: chatId}
                        },
                        content: value.content?? "",
                        message_type: MessageType[value.message_type as keyof typeof MessageType],
                        message_url: value.message_url?? null,
                    }
                })
                const data = {...newMessage}
                return handleSuccess(res, 201, "New message Created", data)
        } catch (error) {
            return handleError(res, 500, error)
        }
        
    }
}
