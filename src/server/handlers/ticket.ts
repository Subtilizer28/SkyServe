import pool from "@/server/db";
import type { Tickets } from "@/lib/types";

export const getTicketById = async (id: string) => {
  const result = await pool.query<Tickets>("SELECT * FROM ticket WHERE id = $1", [id]);
  return result.rows[0];
};

export const getTicketsByPassenger = async (passengerId: string) => {
  const result = await pool.query<Tickets>("SELECT * FROM ticket WHERE passenger_id = $1", [passengerId]);
  return result.rows;
};

export const getTicketsByFlight = async (flightId: string) => {
  const result = await pool.query<Tickets>("SELECT * FROM ticket WHERE flight_id = $1", [flightId]);
  return result.rows;
};
