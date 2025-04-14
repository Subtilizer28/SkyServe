import { NextResponse } from "next/server";
import { getAllTickets } from "@/server/handlers/ticket";

export async function GET() {
  try {
    const tickets = await getAllTickets();
    return NextResponse.json(tickets);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 },
    );
  }
}