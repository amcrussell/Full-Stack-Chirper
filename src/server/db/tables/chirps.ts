import { SelectQuery, ModifyQuery } from "../queryUtils";
import type { RowDataPacket } from "mysql2";

export interface IChirpsRow extends RowDataPacket {
    id: number;
    user_id: number;
    body: string;
    location: string;
}

export function getAll() {
    return SelectQuery<IChirpsRow>('SELECT * FROM chirps ORDER BY id DESC;');
}

export function getOne(id: number) {
    return SelectQuery<IChirpsRow>('SELECT * FROM chirps WHERE id=? ORDER BY id DESC;', [id])
}

export function createChirp(user_id: number, body: string, location: string, mentioned?: number) {
    if (body.includes("@") && mentioned != 0) {
        return ModifyQuery('CALL add_mention(?,?,?,?)', [user_id, body, location, mentioned]);
    } else
        return ModifyQuery('INSERT INTO chirps (user_id, body, location) VALUE (?,?,?)', [user_id, body, location]);
}

export function editChirp(id: number, body: string, mentioned: number) {
    if (mentioned > 0) {
        return ModifyQuery('CALL edit_chirp(?,?,?);', [id, body, mentioned])
    } else
        return ModifyQuery('UPDATE chirps SET body = ? WHERE id = ?;', [body, id]);
}

export function deleteChirp(id: number) {
    return ModifyQuery('CALL delete_chirp(?);', [id]);
}

export function getChirpsFromUser(user_id: number) {
    return SelectQuery<IChirpsRow>('SELECT * FROM chirps WHERE user_id=? ORDER BY id DESC;', [user_id]);
}