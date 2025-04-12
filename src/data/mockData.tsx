
// Airports data
export const airports = [
  { id: "1", name: "John F. Kennedy International Airport", code: "JFK", city: "New York", country: "USA", terminals: 6 },
  { id: "2", name: "Los Angeles International Airport", code: "LAX", city: "Los Angeles", country: "USA", terminals: 9 },
  { id: "3", name: "Heathrow Airport", code: "LHR", city: "London", country: "UK", terminals: 5 },
  { id: "4", name: "Charles de Gaulle Airport", code: "CDG", city: "Paris", country: "France", terminals: 3 },
  { id: "5", name: "Tokyo Haneda Airport", code: "HND", city: "Tokyo", country: "Japan", terminals: 3 },
  { id: "6", name: "Dubai International Airport", code: "DXB", city: "Dubai", country: "UAE", terminals: 3 },
];

// Controllers data
export const controllers = [
  { id: "1", name: "John Smith", position: "Senior ATC", airports: ["JFK"], contactNumber: "+1 555-1234", email: "john.smith@skyserve.com" },
  { id: "2", name: "Emily Johnson", position: "Lead Controller", airports: ["LAX"], contactNumber: "+1 555-2345", email: "emily.johnson@skyserve.com" },
  { id: "3", name: "Michael Williams", position: "Tower Controller", airports: ["LHR"], contactNumber: "+44 20 1234 5678", email: "michael.williams@skyserve.com" },
  { id: "4", name: "Sophia Brown", position: "Approach Controller", airports: ["CDG"], contactNumber: "+33 1 2345 6789", email: "sophia.brown@skyserve.com" },
  { id: "5", name: "James Davis", position: "Departure Controller", airports: ["HND"], contactNumber: "+81 3 1234 5678", email: "james.davis@skyserve.com" },
  { id: "6", name: "Olivia Miller", position: "Approach Controller", airports: ["DXB"], contactNumber: "+971 4 123 4567", email: "olivia.miller@skyserve.com" },
];

// Passengers data
export const passengers = [
  { id: "1", name: "Robert Garcia", email: "robert.garcia@example.com", nationality: "American", passportNumber: "US123456", contactNumber: "+1 555-9876" },
  { id: "2", name: "Emma Wilson", email: "emma.wilson@example.com", nationality: "British", passportNumber: "UK987654", contactNumber: "+44 20 9876 5432" },
  { id: "3", name: "Liam Chen", email: "liam.chen@example.com", nationality: "Chinese", passportNumber: "CN456789", contactNumber: "+86 10 1234 5678" },
  { id: "4", name: "Sophia Martinez", email: "sophia.martinez@example.com", nationality: "Spanish", passportNumber: "ES567890", contactNumber: "+34 91 234 5678" },
  { id: "5", name: "Noah Kim", email: "noah.kim@example.com", nationality: "Korean", passportNumber: "KR234567", contactNumber: "+82 2 1234 5678" },
  { id: "6", name: "Ava Patel", email: "ava.patel@example.com", nationality: "Indian", passportNumber: "IN345678", contactNumber: "+91 11 2345 6789" },
];

// Flights data
export const flights = [
  { 
    id: "1", 
    flightNumber: "SV101", 
    airline: "SkyServe Airlines", 
    departureAirport: "JFK", 
    arrivalAirport: "LAX", 
    departureTime: "2025-04-15T08:00:00", 
    arrivalTime: "2025-04-15T11:30:00", 
    status: "Scheduled",
    aircraft: "Boeing 787-9",
    gate: "A12",
    terminal: "1",
    assignedController: "1"
  },
  { 
    id: "2", 
    flightNumber: "SV202", 
    airline: "SkyServe Airlines", 
    departureAirport: "LAX", 
    arrivalAirport: "JFK", 
    departureTime: "2025-04-15T14:00:00", 
    arrivalTime: "2025-04-15T22:30:00", 
    status: "Scheduled",
    aircraft: "Airbus A320",
    gate: "B5",
    terminal: "2",
    assignedController: "2"
  },
  { 
    id: "3", 
    flightNumber: "SV303", 
    airline: "SkyServe Airlines", 
    departureAirport: "LHR", 
    arrivalAirport: "CDG", 
    departureTime: "2025-04-16T09:15:00", 
    arrivalTime: "2025-04-16T11:45:00", 
    status: "Scheduled",
    aircraft: "Boeing 737-800",
    gate: "C10",
    terminal: "3",
    assignedController: "3"
  },
  { 
    id: "4", 
    flightNumber: "SV404", 
    airline: "SkyServe Airlines", 
    departureAirport: "CDG", 
    arrivalAirport: "LHR", 
    departureTime: "2025-04-16T13:30:00", 
    arrivalTime: "2025-04-16T14:45:00", 
    status: "Scheduled",
    aircraft: "Airbus A350",
    gate: "D7",
    terminal: "2",
    assignedController: "4"
  },
  { 
    id: "5", 
    flightNumber: "SV505", 
    airline: "SkyServe Airlines", 
    departureAirport: "HND", 
    arrivalAirport: "DXB", 
    departureTime: "2025-04-17T00:30:00", 
    arrivalTime: "2025-04-17T06:45:00", 
    status: "Scheduled",
    aircraft: "Boeing 777-300ER",
    gate: "E14",
    terminal: "3",
    assignedController: "5"
  },
  { 
    id: "6", 
    flightNumber: "SV606", 
    airline: "SkyServe Airlines", 
    departureAirport: "DXB", 
    arrivalAirport: "HND", 
    departureTime: "2025-04-17T10:00:00", 
    arrivalTime: "2025-04-17T23:30:00", 
    status: "Scheduled",
    aircraft: "Airbus A380",
    gate: "F2",
    terminal: "3",
    assignedController: "6"
  },
];

// Tickets data
export const tickets = [
  { 
    id: "1", 
    flightId: "1", 
    passengerId: "1", 
    seat: "12A", 
    class: "Economy", 
    bookingDate: "2025-03-15T10:30:00", 
    price: 350.00,
    status: "Confirmed"
  },
  { 
    id: "2", 
    flightId: "2", 
    passengerId: "2", 
    seat: "5F", 
    class: "Business", 
    bookingDate: "2025-03-16T09:45:00", 
    price: 1250.00,
    status: "Confirmed"
  },
  { 
    id: "3", 
    flightId: "3", 
    passengerId: "3", 
    seat: "20C", 
    class: "Economy", 
    bookingDate: "2025-03-17T14:20:00", 
    price: 220.00,
    status: "Confirmed"
  },
  { 
    id: "4", 
    flightId: "4", 
    passengerId: "4", 
    seat: "1A", 
    class: "First", 
    bookingDate: "2025-03-18T11:10:00", 
    price: 1800.00,
    status: "Confirmed"
  },
  { 
    id: "5", 
    flightId: "5", 
    passengerId: "5", 
    seat: "15D", 
    class: "Economy", 
    bookingDate: "2025-03-19T16:50:00", 
    price: 780.00,
    status: "Confirmed"
  },
  { 
    id: "6", 
    flightId: "6", 
    passengerId: "6", 
    seat: "8C", 
    class: "Business", 
    bookingDate: "2025-03-20T08:30:00", 
    price: 1450.00,
    status: "Confirmed"
  },
];

// Helper functions
export const getAirportById = (id: string) => {
  return airports.find(airport => airport.id === id);
};

export const getAirportByCode = (code: string) => {
  return airports.find(airport => airport.code === code);
};

export const getControllerById = (id: string) => {
  return controllers.find(controller => controller.id === id);
};

export const getPassengerById = (id: string) => {
  return passengers.find(passenger => passenger.id === id);
};

export const getFlightById = (id: string) => {
  return flights.find(flight => flight.id === id);
};

export const getTicketById = (id: string) => {
  return tickets.find(ticket => ticket.id === id);
};

export const getFlightsByAirportCode = (code: string) => {
  return flights.filter(flight => flight.departureAirport === code || flight.arrivalAirport === code);
};

export const getFlightsByController = (controllerId: string) => {
  return flights.filter(flight => flight.assignedController === controllerId);
};

export const getTicketsByPassenger = (passengerId: string) => {
  return tickets.filter(ticket => ticket.passengerId === passengerId);
};

export const getTicketsByFlight = (flightId: string) => {
  return tickets.filter(ticket => ticket.flightId === flightId);
};

// Format date function
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
