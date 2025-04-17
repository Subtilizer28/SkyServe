import { getAirportByCode } from "@/server/handlers/airport";
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

  const airport = await getAirportByCode(code);
  if (!airport) {
    return NextResponse.json({ error: "Airport not found" }, { status: 404 });
  }

  return NextResponse.json(airport);
}
