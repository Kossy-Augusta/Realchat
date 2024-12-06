import Joi from "joi";
import { newUser } from "../utils/types";



export const creatUserSchema: Joi.ObjectSchema  = Joi.object<newUser>({
    username: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
})