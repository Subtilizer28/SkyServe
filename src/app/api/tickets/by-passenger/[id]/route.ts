import { getTicketsByPassenger } from "@/server/handlers/ticket";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id: passengerId } = params;

  if (!passengerId) {
    return NextResponse.json({ error: "Passenger ID is required" }, { status: 400 });
  }

  const tickets = await getTicketsByPassenger(passengerId);
  return NextResponse.json(tickets);
}
