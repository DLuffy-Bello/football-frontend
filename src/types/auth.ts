export interface ILoginResponse {
    token: string;
    user: IUser;
}

export interface IUser {
    id: number
    name: string
    email: string
    email_verified_at: string
    roles: string[]
    permissions: string[]
    created_at: string
    updated_at: string
}

export interface IUserCredentials {
    email: string;
    password: string;
}

export interface IRegisterCredentials {
   name: string;
   email: string;
   password: string;
}

export interface IRegisterResponse extends ILoginResponse {}
