import { type NextRequest, NextResponse } from 'next/server';
import { getAirportById } from '@/server/handlers/airport';

export async function GET(
  _: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  const airport = await getAirportById(id);
  if (!airport) {
    return NextResponse.json({ error: "Airport not found" }, { status: 404 });
  }

  return NextResponse.json(airport);
}