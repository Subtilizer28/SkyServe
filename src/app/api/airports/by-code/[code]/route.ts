// src/app/api/airports/by-code/[code]/route.ts
import { getAirportByCode } from "@/server/handlers/airport";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  const code = params.code;

  if (!code) {
    return NextResponse.json({ error: "Airport code is required" }, { status: 400 });
  }

  const airport = await getAirportByCode(code);
  if (!airport) {
    return NextResponse.json({ error: "Airport not found" }, { status: 404 });
  }

  return NextResponse.json(airport);
}
