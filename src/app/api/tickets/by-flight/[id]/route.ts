import { getTicketsByFlight } from "@/server/handlers/ticket";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id: flightId } = params;

  if (!flightId) {
    return NextResponse.json({ error: "Flight ID is required" }, { status: 400 });
  }

  const tickets = await getTicketsByFlight(flightId);
  return NextResponse.json(tickets);
}
