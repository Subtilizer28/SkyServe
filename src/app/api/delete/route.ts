/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { deleteRow } from "@/server/handlers/deleteRow";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, table } = body;

  if (!id || !table) {
    return NextResponse.json({ error: "ID and table are required" }, { status: 400 });
  }

  const result = await deleteRow({ id, table });

  if (!result.success) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ message: result.message });
}
