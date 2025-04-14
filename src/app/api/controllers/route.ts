import { NextResponse } from "next/server";
import { getAllControllers } from "@/server/handlers/controller";

export async function GET() {
  try {
    const controllers = await getAllControllers();
    return NextResponse.json(controllers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch controllers" },
      { status: 500 },
    );
  }
}