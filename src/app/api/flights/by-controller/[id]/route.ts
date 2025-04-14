import { getFlightsByController } from "@/server/handlers/flight";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const controllerId = searchParams.get("controllerId");

  if (!controllerId) {
    return NextResponse.json({ error: "Controller ID is required" }, { status: 400 });
  }

  const flights = await getFlightsByController(controllerId);
  return NextResponse.json(flights);
}
