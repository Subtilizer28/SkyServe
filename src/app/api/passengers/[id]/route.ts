import { getPassengerById } from "@/server/handlers/passenger";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "Passenger ID is required" }, { status: 400 });
  }

  const passenger = await getPassengerById(id);
  return NextResponse.json(passenger);
}