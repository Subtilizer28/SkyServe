import { getFlightsByController } from "@/server/handlers/flight";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const controllerId = params.id;

  if (!controllerId) {
    return NextResponse.json({ error: "Controller ID is required" }, { status: 400 });
  }

  const flights = await getFlightsByController(controllerId);
  return NextResponse.json(flights);
}
