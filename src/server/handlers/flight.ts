import pool from "@/server/db";
import type { Flight } from "@/lib/types";

export async function getAllFlights() {
  const res = await pool.query<Flight>("SELECT * FROM flight");
  return res.rows; // type is any[], you can define a Flight type if you want
}

export async function getFlightById(id: string) {
  const res = await pool.query<Flight>("SELECT * FROM flight WHERE id = $1", [
    id,
  ]);
  return res.rows[0]; // returns undefined if not found
}

export const getFlightsByAirportCode = async (code: string) => {
  const result = await pool.query<Flight>(
    `SELECT * FROM flight WHERE departure_airport = $1 OR arrival_airport = $1`,
    [code],
  );
  return result.rows;
};

export const getFlightsByController = async (controllerId: string) => {
  const result = await pool.query<Flight>(
    `SELECT * FROM flight WHERE assigned_controller = $1`,
    [controllerId],
  );
  return result.rows;
};
