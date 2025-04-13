import { NextResponse } from "next/server";
import { getAllFlights } from "@/server/handlers/flight";

export async function GET() {
  try {
    const flights = await getAllFlights();
    return NextResponse.json(flights);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch airports" },
      { status: 500 },
    );
  }
}
