import { getFlightsByAirportCode } from "@/server/handlers/flight";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  const code = params.code;

  if (!code) {
    return NextResponse.json({ error: "Airport code is required" }, { status: 400 });
  }

  const flights = await getFlightsByAirportCode(code);
  return NextResponse.json(flights);
}
