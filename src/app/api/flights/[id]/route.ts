import { type NextRequest, NextResponse } from 'next/server';
import { getFlightById } from '@/server/handlers/flight';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  const flight = await getFlightById(id);
  if (!flight) {
    return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
  }

  return NextResponse.json(flight);
}
