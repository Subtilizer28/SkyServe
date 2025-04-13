import pool from '@/server/db';
import type { Airport } from '@/lib/types';

export async function getAllAirports(): Promise<Airport[]> {
  const res = await pool.query<Airport>('SELECT * FROM airport');
  return res.rows;
}

export async function getAirportById(id: number): Promise<Airport | null> {
  const res = await pool.query<Airport>('SELECT * FROM airport WHERE id = $1', [id]);
  return res.rows[0] ?? null;
}
