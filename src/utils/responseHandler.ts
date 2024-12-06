import { Response } from "express";
import { ResponseObject } from "./types";

// helper functions to handle responses
export const handleError = (
    res: Response,
    statuscode: number,
    error: unknown
) : Response =>{
    const errorMessage = error instanceof Error
    ? error.message
    : typeof error === "string"
        ? error
        : "An Unexpected error occured";
    
    const response: ResponseObject = {
        error: true,
        message: errorMessage
    };

    return res.status(statuscode).send(response);
}

export const handleSuccess = (
    res: Response,
    statuscode: number,
    message: string,
    data?: object
): Response =>{
    const response : ResponseObject ={
        error:false,
        message: message,
        data
    };
    return res.status(statuscode).send(response);
}