

export interface IChirps {
    id: number;
    user_id: number;
    body: string;
    location: string;
    created_at:string;
}

export interface IUser {
    id: number;
    handle: string;
    email: string;
    created_at: string;
}