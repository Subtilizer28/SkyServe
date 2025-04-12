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
