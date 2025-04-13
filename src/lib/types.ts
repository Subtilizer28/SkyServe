export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  status: string;
  aircraft: string;
  gate: string;
  terminal: string;
  assignedController: string;
}

export interface Controller {
  id: string;
  name: string;
  position: string;
  airports: string[];
  contactNumber: string;
  email: string;
}

export interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  terminals: number;
}

export interface Passenger {
  id: string;
  name: string;
  email: string;
  nationality: string;
  passportNumber: string;
  contactNumber: string;
}

export interface Tickets {
  id: string;
  flightId: string;
  passengerId: string;
  bookingDate: string;
  price: number;
  seat: string;
  class: string;
  status: string;
  // These are derived/formatted fields for display
  flightNumber: string;
  passengerName: string;
  route: string;
  departureTime: string;
  formattedPrice: string;
  formattedBookingDate: string;
}

