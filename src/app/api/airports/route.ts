import { NextResponse } from "next/server";
import { getAllAirports } from "@/server/handlers/airport";

export async function GET() {
  try {
    const airports = await getAllAirports();
    return NextResponse.json(airports);
  } catch (error) {
    console.error("Error in GET /api/airports:", error);
    return NextResponse.json(
      { error: "Failed to fetch airports", },
      { status: 500 }
    );
  }
}

