import { getFlightById } from "@/server/handlers/flight";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "Flight ID is required" }, { status: 400 });
  }

  const flight = await getFlightById(id);
  if (!flight) {
    return NextResponse.json({ error: "Flight not found" }, { status: 404 });
  }

  return NextResponse.json(flight);
}