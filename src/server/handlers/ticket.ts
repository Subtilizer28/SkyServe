import pool from "@/server/db";
import type { Tickets } from "@/lib/types";

export const getTicketById = async (id: string) => {
  const result = await pool.query<Tickets>(
    "SELECT * FROM ticket WHERE id = $1",
    [id],
  );
  return result.rows[0];
};

export const getTicketsByPassenger = async (passengerId: string) => {
  const result = await pool.query<Tickets>(
    "SELECT * FROM ticket WHERE passenger_id = $1",
    [passengerId],
  );
  return result.rows;
};

export const getTicketsByFlight = async (flightId: string) => {
  const result = await pool.query<Tickets>(
    "SELECT * FROM ticket WHERE flight_id = $1",
    [flightId],
  );
  return result.rows;
};

export const createTicket = async (ticket: Omit<Tickets, "id">) => {
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
  } = ticket;

  const result = await pool.query<Tickets>(
    `INSERT INTO tickets (
      passenger_id, flight_id, seat_number, booking_date, class,
      status, price, formatted_price, flight_number, departure_time
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10
    )
    RETURNING *`,
    [
      passengerId,
      flightId,
      seat,
      bookingDate,
      ticketClass,
      status,
      price,
      formattedPrice,
      flightNumber,
      departureTime,
    ],
  );

  return result.rows[0];
};
