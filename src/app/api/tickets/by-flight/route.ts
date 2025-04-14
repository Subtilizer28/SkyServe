import { getTicketsByFlight } from "@/server/handlers/ticket";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const flightId = searchParams.get("flightId");

  if (!flightId) {
    return NextResponse.json({ error: "Flight ID is required" }, { status: 400 });
  }

  const tickets = await getTicketsByFlight(flightId);
  return NextResponse.json(tickets);
}
