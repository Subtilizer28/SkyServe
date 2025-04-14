import { getTicketsByPassenger } from "@/server/handlers/ticket";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const passengerId = searchParams.get("passengerId");

  if (!passengerId) {
    return NextResponse.json({ error: "Passenger ID is required" }, { status: 400 });
  }

  const tickets = await getTicketsByPassenger(passengerId);
  return NextResponse.json(tickets);
}
