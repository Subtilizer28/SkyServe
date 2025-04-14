import { getControllerById } from "@/server/handlers/controller";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Controller ID is required" }, { status: 400 });
  }

  const controller = await getControllerById(id);
  if (!controller) {
    return NextResponse.json({ error: "Controller not found" }, { status: 404 });
  }

  return NextResponse.json(controller);
}
