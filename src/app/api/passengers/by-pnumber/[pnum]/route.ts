import { getPassengerByPassportNumber } from "@/server/handlers/passenger";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { pnum: string } }
) {
  const { pnum } = context.params;

  if (!pnum) {
    return NextResponse.json({ error: "Passenger Passport Number is required" }, { status: 400 });
  }

  const passenger = await getPassengerByPassportNumber(pnum);
  return NextResponse.json(passenger);
}