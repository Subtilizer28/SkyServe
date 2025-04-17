// lib/handlers/deleteRow.ts
import pool from "@/server/db";

interface DeleteRowPayload {
  id: string;
  table: string;
}

export async function deleteRow({ id, table }: DeleteRowPayload): Promise<{ success: boolean; message: string }> {
  const ALLOWED_TABLES = ["Airport", "Controller", "Flight", "Passenger", "Tickets"]; // Add allowed table names

  if (!id || !table) {
    return { success: false, message: "Missing ID or table name" };
  }

  if (!ALLOWED_TABLES.includes(table)) {
    return { success: false, message: "Invalid table name" };
  }

  const query = `DELETE FROM ${table} WHERE id = $1`;

  const result = await pool.query(query, [id]);

  if (result.rowCount === 0) {
    return { success: false, message: "Row not found" };
  }

  return { success: true, message: "Deleted successfully" };
}
