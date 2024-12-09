import Joi from "joi";
import { sendNewMessage } from "../utils/types";
import { MessageType } from "@prisma/client";

const method = (value: any, helper: Joi.CustomHelpers) => {
    if (value.sender_id === value.reciever_id) {
        return helper.error("custom.senderReceiverConflict");
    }
    return value;
};
export const sendNewMessageSchema = Joi.object<sendNewMessage>({
    sender_id : Joi.number().required(),
    reciever_id : Joi.number().required(),
    content: Joi.string().required(),
    message_type: Joi.string()
        .valid(...Object.values(MessageType))  // Ensure message_type is one of the enum values
        .required(),
}).custom(method,"Custom validation for sender and receiver")
    .messages({
    "custom.senderReceiverConflict": "Sender and receiver cannot have the same id."
    })

