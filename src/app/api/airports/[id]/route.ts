import { type NextRequest, NextResponse } from 'next/server';
import { getAirportById } from '@/server/handlers/airport';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const airport = await getAirportById(id);

  if (!airport) {
    return NextResponse.json({ error: 'Airport not found' }, { status: 404 });
  }

  return NextResponse.json(airport);
}
