import { createTicket } from "@/server/handlers/ticket";
import { NextResponse } from "next/server";
import { z } from "zod";

const TicketSchema = z.object({
  passengerId: z.string(),
  flightId: z.string(),
  seat: z.string(),
  bookingDate: z.string(), // ISO string format
  class: z.enum(["Economy", "Business", "First"]),
  status: z.string(),
  price: z.number(),
  formattedPrice: z.string(),
  flightNumber: z.string(),
  departureTime: z.string(), // ISO format
});

export async function POST(req: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await req.json();
    const body = TicketSchema.parse(json);

    const {
      passengerId,
      flightId,
      seat,
      bookingDate,
      class: ticketClass,
      status,
      price,
      formattedPrice,
      flightNumber,
      departureTime,
    } = body;

    const ticket = await createTicket({
      passengerId,
      flightId,
      seat,
      bookingDate,
      class: ticketClass,
      status,
      price,
      formattedPrice,
      flightNumber,
      departureTime,
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
