// src/app/api/flights/by-airport/route.ts
import { getFlightsByAirportCode } from "@/server/handlers/flight";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Airport code is required" }, { status: 400 });
  }

  const flights = await getFlightsByAirportCode(code);
  return NextResponse.json(flights);
}
