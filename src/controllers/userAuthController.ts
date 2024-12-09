import { Request, Response } from "express";
import UserAuthInterface from "../interfaces/auth.interface";
import {creatUserSchema, loginUserSchema} from "../validations/user-auth-validation"
import { handleError, handleSuccess } from "../utils/responseHandler";
import prisma from "../utils/clients";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envVars from "../validations/env-validation";

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
    async login(req: Request, res: Response): Promise<Response> {
        const {error, value} = loginUserSchema.validate(req.body);
        if(error) return handleError(res, 400, error);

        // check if user existst
        try {
            const currentUser = await prisma.user.findUnique({
            where:{email: value.email},
        });
        if (!currentUser) return handleError(res, 400, "User doe not exist");
        const verrifyPassword = await bcrypt.compare(value.password, currentUser.password);
        if (!verrifyPassword) handleError(res, 403, "Incorrect Password");
        
        // create JWT
        const accessToken: string = jwt.sign(
        {
            userInfo: {
                username: currentUser.username,
                email: currentUser.email
            }
        },
        envVars.ACCESS_TOKEN_SECRET,
        {expiresIn: "10m"}
        );
        const refreshToken = jwt.sign(
            {
                userInfo: {
                    username: currentUser.username,
                    email: currentUser.email
                }
            },
            envVars.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        );
        const updateUser = await prisma.user.update({
            where: {
                email: currentUser.email
            },
            data:{
                refresh_token: refreshToken
            }
        });
        res.cookie("refresh-token", refreshToken,{
            httpOnly: true,
            // secure: true,
            maxAge: 24*60*60*1000
        })
        const data: object = {
            access_token: accessToken,
            id: updateUser.id,
            user_name: updateUser.username,
            email: updateUser.email
        }
        return handleSuccess(res,200, "User logged in successfuly", data);
        } catch (error) {
            return handleError(res, 500, error)
        }
        
    }
}