import { Request, Response } from "express";
import UserAuthInterface from "../interfaces/auth.interface";
import {creatUserSchema} from "../validations/user-validation"
import { handleError, handleSuccess } from "../utils/responseHandler";
import prisma from "../utils/clients";
import bcrypt from "bcrypt";

export default class UserAuth implements UserAuthInterface{
    async create(req: Request, res: Response): Promise<Response> {
        const {error, value} = creatUserSchema.validate(req.body, {abortEarly: false});
        if (error) return handleError(res, 400, error);

        // check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: value.email
            },
        });
        if (existingUser) return handleError(res, 409, "User already exist");
        const hashPassword =await  bcrypt.hash(value.password, 10);
        const createNewUser = await prisma.user.create({
            data: {
                username: value.username,
                email: value.email,
                password: hashPassword
            }
        });
        const data: object = createNewUser
        return handleSuccess(res, 201, "New User crated succesfully", data)
    }
}