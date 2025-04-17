export interface Flight {
  id: string;
  flightnumber: string;
  airline: string;
  departureairport: string;
  arrivalairport: string;
  departuretime: string;
  arrivaltime: string;
  status: string;
  aircraft: string;
  gate: string;
  terminal: string;
  assignedcontroller: string;
}

export interface Controller {
  id: string;
  name: string;
  position: string;
  airportcode: string;
  contactnumber: string;
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
  passportnumber: string;
  contactnumber: string;
}

export interface Tickets {
  id: string;
  flightid: string;
  passengerpassportnumber: string;
  bookingdate: string;
  price: number;
  seat: string;
  class: "Economy" | "Business" | "First";
  status: string;
}


