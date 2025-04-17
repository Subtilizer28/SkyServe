import pool from '@/server/db';
import type { Passenger } from '@/lib/types';

export async function getAllPassengers(): Promise<Passenger[]> {
  const res = await pool.query<Passenger>('SELECT * FROM Passenger');
  return res.rows;
}

export async function getPassengerById(id: string): Promise<Passenger | null> {
  const res = await pool.query<Passenger>('SELECT * FROM Passenger WHERE id = $1', [id]);
  return res.rows[0] ?? null;
}

export async function getPassengerByPassportNumber(id: string): Promise<Passenger | null> {
  const res = await pool.query<Passenger>('SELECT * FROM Passenger WHERE passportnumber = $1', [id]);
  return res.rows[0] ?? null;
}