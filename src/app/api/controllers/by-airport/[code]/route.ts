import { NextResponse } from "next/server";
import { getControllersByAirportCode } from "@/server/handlers/controller";

export async function GET(req: Request, { params }: { params: { code: string } }) {
  const controllers = await getControllersByAirportCode(params.code);
  return NextResponse.json(controllers);
}
