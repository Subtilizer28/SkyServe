import { getFlightById } from "@/server/handlers/flight";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "Flight ID is required" }, { status: 400 });
  }

  const flight = await getFlightById(id);
  if (!flight) {
    return NextResponse.json({ error: "Flight not found" }, { status: 404 });
  }

  return NextResponse.json(flight);
}