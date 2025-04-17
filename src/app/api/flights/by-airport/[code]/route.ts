import { getFlightsByAirportCode } from "@/server/handlers/flight";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: { code: string } },
) {
  const code = context.params.code;

  if (!code) {
    return NextResponse.json(
      { error: "Airport code is required" },
      { status: 400 },
    );
  }

  const flights = await getFlightsByAirportCode(code);
  return NextResponse.json(flights);
}
