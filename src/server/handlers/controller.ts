import pool from "@/server/db";
import type { Controller } from "@/lib/types";

export async function getAllControllers(): Promise<Controller[]> {
  const res = await pool.query<Controller>("SELECT * FROM controller");
  return res.rows;
}

export async function getControllerById(
  id: string,
): Promise<Controller | null> {
  const res = await pool.query<Controller>(
    "SELECT * FROM controller WHERE id = $1",
    [id],
  );
  return res.rows[0] ?? null;
}

export async function getControllersByAirportCode(
  code: string,
): Promise<Controller | null> {
  const res = await pool.query<Controller>(
    `
    SELECT DISTINCT c.id, c.name, c.position, c.contactNumber, c.email
    FROM controller c
    JOIN flight f ON f.assignedController = c.id
    WHERE f.departureAirport = $1 OR f.arrivalAirport = $1
    `,
    [code],
  );
  return res.rows[0] ?? null;
}
