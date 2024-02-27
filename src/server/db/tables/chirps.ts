import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface IChirpsRow extends RowDataPacket {
    id: number;
    user_id: number;
    body: string;
    location: string;
}

export function getAll() {
    return SelectQuery<IChirpsRow>('SELECT * FROM chirps;');
}

export function getOne(id: number) {
    return SelectQuery<IChirpsRow>('SELECT * FROM chirps WHERE id=?;', [id])
}

export function createChirp(user_id: number, body: string, location: string, mentions?: number){
    if(body.includes("@")){
        return ModifyQuery('CALL add_mention(?,?,?,?)', [user_id, body, location, mentions]);
    };
    return ModifyQuery('INSERT INTO chirps (user_id, body, location) VALUE (?,?,?)', [user_id, body, location]);
}

export function editChirp(id: number, body: string){
    return ModifyQuery('UPDATE chirps SET body = ? WHERE id = ?;', [body, id]);
}

export function deleteChirp(id: number){
    return ModifyQuery('CALL delete_chirp(?);', [id]);
}

export function getChirpsFromUser(user_id: number){
    return SelectQuery<IChirpsRow>('SELECT * FROM chirps WHERE user_id=?;', [user_id]);
}