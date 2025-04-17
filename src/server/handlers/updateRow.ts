import pool from "@/server/db"; // adjust the import based on your project structure

export async function updateRow<T extends Record<string, unknown>>(
  id: string,
  table: string,
  data: T,
): Promise<T> {
  const keys = Object.keys(data);
  const values = Object.values(data);

  if (keys.length === 0) {
    throw new Error("No fields provided for update.");
  }

  const setClause = keys.map((key, idx) => `"${key}" = $${idx + 1}`).join(", ");
  const idParamIndex = keys.length + 1;

  const query = `
      UPDATE ${table}
      SET ${setClause}
      WHERE id = $${idParamIndex}
      RETURNING *;
    `;

  const result = await pool.query<T>(query, [...values, id]);

  if (!result.rows[0]) {
    throw new Error("Update failed: No row returned");
  }
  return result.rows[0];
}
