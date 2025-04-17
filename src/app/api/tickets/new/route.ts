/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createTicket } from "@/server/handlers/ticket";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define schema for request body validation
const TicketSchema = z.object({
  passengerId: z.string(),
  flightId: z.string(),
  seat: z.string(),
  bookingDate: z.string(), // ISO string
  class: z.enum(["Economy", "Business", "First"]),
  status: z.string(),
  price: z.number(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = TicketSchema.parse(json);

    const ticket = await createTicket({
      passengerpassportnumber: body.passengerId,
      flightid: body.flightId,
      seat: body.seat,
      bookingdate: body.bookingDate,
      class: body.class,
      status: body.status,
      price: body.price,
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json({ error: "Invalid data or internal error" }, { status: 500 });
  }
}
