import pool from '@/server/db';
import type { Flight } from '@/lib/types';

export async function getAllFlights() {
  const res = await pool.query<Flight>('SELECT * FROM flight');
  return res.rows; // type is any[], you can define a Flight type if you want
}

export async function getFlightById(id: number) {
  const res = await pool.query<Flight>('SELECT * FROM flight WHERE id = $1', [id]);
  return res.rows[0]; // returns undefined if not found
}
