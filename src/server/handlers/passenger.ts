import pool from '@/server/db';
import type { Passenger } from '@/lib/types';

export async function getControllerById(id: string): Promise<Passenger | null> {
  const res = await pool.query<Passenger>('SELECT * FROM passenger WHERE id = $1', [id]);
  return res.rows[0] ?? null;
}