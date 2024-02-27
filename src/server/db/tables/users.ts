import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface IUsersRow extends RowDataPacket {
    id: number;
    handle: string;
    email: string;
    created_at: string;
}

export function getAll() {
    return SelectQuery<IUsersRow>('SELECT * FROM users;');
}

export function getOne(id: number) {
    return SelectQuery<IUsersRow>('SELECT * FROM users WHERE id=?;', [id])
}

export function createUser(handle: string, email: string){
    return ModifyQuery('INSERT INTO users (user_id, body) VALUE (?,?)', [handle, email]);
}

export function deleteUser(id: number){
    return ModifyQuery('DELETE * FROM users WHERE id=?', [id]);
}

