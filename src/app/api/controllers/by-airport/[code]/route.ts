import { type NextRequest, NextResponse } from "next/server";
import { getControllersByAirportCode } from "@/server/handlers/controller";

export async function GET(
  _: NextRequest,
  context: { params: { code: string } }
) {
  const code = context.params.code;

  if (!code) {
    return NextResponse.json({ error: "Airport code is required" }, { status: 400 });
  }

  try {
    const controllers = await getControllersByAirportCode(code);
    return NextResponse.json(controllers);
  } catch (error) {
    console.error("Error fetching controllers:", error);
    return NextResponse.json({ error: "Failed to fetch controllers" }, { status: 500 });
  }
}
