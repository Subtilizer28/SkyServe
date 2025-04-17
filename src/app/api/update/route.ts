/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { updateRow } from "@/server/handlers/updateRow";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id, table, values } = body;

    if (!id || !table || !values) {
      return NextResponse.json(
        { error: "Missing 'id', 'table', or 'values' in request body" },
        { status: 400 },
      );
    }

    const updatedRow = await updateRow<typeof values>(id, table, values);
    return NextResponse.json(updatedRow);
  } catch (err) {
    console.error("Error in /api/update route:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
