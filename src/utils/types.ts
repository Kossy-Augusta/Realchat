// add custom property to the request object
declare global {
    namespace Express {
    interface Request {
        userInfo?: UserInfo;
    }
    }
}
export type ResponseObject ={
    error: boolean,
    message: string,
    data?: object
}

export type newUser = {
    username: string
    email: string,
    password: string,
    picture?: string,
    refresh_toke?:string
}
export type loginUser = {
    email: string,
    password: string
}
export type sendNewMessage = {
    sender_id: number,
    reciever_id: number,
    content: string,
    message_type: string,
    message_url?: string
}

export type UserInfo = {
    username: string;
    email: string;
}