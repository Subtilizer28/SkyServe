import pool from '@/server/db';
import type { Controller } from '@/lib/types';

export async function getControllerById(id: string): Promise<Controller | null> {
  const res = await pool.query<Controller>('SELECT * FROM controller WHERE id = $1', [id]);
  return res.rows[0] ?? null;
}