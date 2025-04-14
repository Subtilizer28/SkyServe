import { getPassengerById } from "@/server/handlers/passenger";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Passenger ID is required" }, { status: 400 });
  }

  const passenger = await getPassengerById(id);
  if (!passenger) {
    return NextResponse.json({ error: "Passenger not found" }, { status: 404 });
  }

  return NextResponse.json(passenger);
}
