import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { handleError } from "../utils/responseHandler";
import envVars from "../validations/env-validation";

const verifyJWT = (req: Request, res: Response, next: NextFunction)=>{
    const authHeadear = req.headers["authorization"];
    const accessToken = envVars.ACCESS_TOKEN_SECRET

    if (!authHeadear?.startsWith("Bearer")){
        handleError(res, 400, "Unauthorized");
        return;
    }
    const token = authHeadear.split(" ")[1];

    jwt.verify(token, accessToken, (err: any, decoded: any)=>{
        if (err){
            handleError(res, 403, err.message || "Token verification failed");
            return;
        }
        if(decoded){
            req.userInfo = {
                username: decoded.username,
                email: decoded.email
            }
        }
        next()
    })
}

export default verifyJWT;