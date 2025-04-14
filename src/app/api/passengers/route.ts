import { NextResponse } from "next/server";
import { getAllPassengers } from "@/server/handlers/passenger";

export async function GET() {
  try {
    const passengers = await getAllPassengers();
    return NextResponse.json(passengers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch passengers" },
      { status: 500 },
    );
  }
}