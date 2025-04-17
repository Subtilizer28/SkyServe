import pool from "@/server/db";
import type { Controller } from "@/lib/types";

export async function getAllControllers(): Promise<Controller[]> {
  const res = await pool.query<Controller>("SELECT * FROM Controller");
  return res.rows;
}

export async function getControllerById(
  id: string,
): Promise<Controller | null> {
  const res = await pool.query<Controller>(
    "SELECT * FROM Controller WHERE id = $1",
    [id],
  );
  return res.rows[0] ?? null;
}

export async function getControllersByAirportCode(
  code: string,
): Promise<Controller | null> {
  const res = await pool.query<Controller>(
    "SELECT * FROM Controller WHERE airportcode = $1",
    [code],
  );
  return res.rows[0] ?? null;
}
