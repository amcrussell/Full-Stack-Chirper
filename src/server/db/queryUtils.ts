import pool from './connections';
import type { ResultSetHeader } from 'mysql2';


export async function SelectQuery<T>(queryString: string, params?: any): Promise<Partial<T>[]>{
    const [results] = await pool.execute(queryString, params);
    return results as T[];
}

export async function ModifyQuery(queryString: string, params?: any): Promise<ResultSetHeader>{
    const [results] = await pool.query(queryString, params);
    return results as ResultSetHeader;
}