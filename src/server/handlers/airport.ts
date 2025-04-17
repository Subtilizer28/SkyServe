import pool from '@/server/db';
import type { Airport } from '@/lib/types';

export async function getAllAirports(): Promise<Airport[]> {
  const res = await pool.query<Airport>('SELECT * FROM Airport');
  return res.rows;
}

export async function getAirportById(id: string): Promise<Airport | null> {
  const res = await pool.query<Airport>('SELECT * FROM Airport WHERE id = $1', [id]);
  return res.rows[0] ?? null;
}

export const getAirportByCode = async (code: string) => {
  const result = await pool.query<Airport>("SELECT * FROM Airport WHERE code = $1", [code]);
  return result.rows[0];
};