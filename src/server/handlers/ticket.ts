import pool from "@/server/db";
import type { Tickets } from "@/lib/types";

export async function getAllTickets(): Promise<Tickets[]> {
  const res = await pool.query<Tickets>('SELECT * FROM Tickets');
  return res.rows;
}

export const getTicketById = async (id: string) => {
  const result = await pool.query<Tickets>(
    "SELECT * FROM Tickets WHERE id = $1",
    [id],
  );
  return result.rows[0];
};

export const getTicketsByPassenger = async (passengerId: string) => {
  const result = await pool.query<Tickets>(
    "SELECT * FROM Tickets WHERE passengerpassportnumber = $1",
    [passengerId],
  );
  return result.rows;
};

export const getTicketsByFlight = async (flightId: string) => {
  const result = await pool.query<Tickets>(
    "SELECT * FROM Tickets WHERE flightid = $1",
    [flightId],
  );
  return result.rows;
};

export const createTicket = async (ticket: Omit<Tickets, "id">) => {
  const {
    passengerpassportnumber,
    flightid,
    seat,
    bookingdate,
    class: ticketClass,
    status,
    price,
  } = ticket;

  const result = await pool.query<Tickets>(
    `INSERT INTO Tickets (
      flightid, passengerpassportnumber, bookingdate, price, seat,
      class, status
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7
    )
    RETURNING *`,
    [
      flightid,
      passengerpassportnumber,
      bookingdate,
      price,
      seat,
      ticketClass,
      status,
    ]
  );

  return result.rows[0];
};
