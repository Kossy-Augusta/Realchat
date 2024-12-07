
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