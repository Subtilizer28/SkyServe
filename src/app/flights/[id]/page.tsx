"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import {
  PlaneTakeoff,
  Clock,
  Calendar,
  MapPin,
  User,
  Luggage,
  AlarmClock,
  Building2,
} from "lucide-react";
import type { Flight, Airport, Controller, Tickets } from "@/lib/types";
import { formatDate } from "@/lib/format";

const FlightDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [departureAirport, setDepartureAirport] = useState<Airport | null>(null);
  const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null);
  const [controller, setController] = useState<Controller | null>(null);
  const [tickets, setTickets] = useState<Tickets[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resFlight = await axios.get<Flight>(`/api/flights/${id}`);
        setFlight(resFlight.data);
  
        const [departureRes, arrivalRes, controllerRes, ticketsRes] = await Promise.all([
          axios.get<Airport>(`/api/airports/by-code/${resFlight.data.departureairport}`),
          axios.get<Airport>(`/api/airports/by-code/${resFlight.data.arrivalairport}`),
          axios.get<Controller>(`/api/controllers/${resFlight.data.assignedcontroller}`),
          axios.get<Tickets[]>(`/api/tickets/by-flight/${resFlight.data.flightnumber}`)
        ]);
  
        setDepartureAirport(departureRes.data);
        setArrivalAirport(arrivalRes.data);
        setController(controllerRes.data);
        setTickets(ticketsRes.data);
      } catch (error) {
        console.error("Error fetching flight details:", error);
      } finally {
        console.log("Flight details fetched successfully");
      }
    };
  
    if (id) void fetchData();
  }, [id, flight]);

  if (!flight) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-grow items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Flight Not Found</h1>
            <p className="mb-6">
              The flight you are looking for does not exist or may have been
              removed.
            </p>
            <Button asChild>
              <Link href="/flights">Back to Flights</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate flight duration
  const departureTime = new Date(flight.departuretime);
  const arrivalTime = new Date(flight.arrivaltime);
  const durationMs = arrivalTime.getTime() - departureTime.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor(
    (durationMs % (1000 * 60 * 60)) / (1000 * 60),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="page-container">
          <PageHeader
            title={`Flight ${flight.flightnumber}`}
            description={`${departureAirport?.city} to ${arrivalAirport?.city} • ${formatDate(flight.departuretime)}`}
            actions={
              <div className="flex gap-4">
                <Button asChild variant="outline">
                  <Link href="/flights">Back to Flights</Link>
                </Button>
                <Button asChild>
                  <Link href="/tickets/new">Book This Flight</Link>
                </Button>
              </div>
            }
          />

          <div className="mb-8">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Flight Basic Info */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-navy-800">
                    Flight Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <PlaneTakeoff className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Airline</div>
                        <div className="font-medium">{flight.airline}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <Luggage className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Aircraft</div>
                        <div className="font-medium">{flight.aircraft}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <AlarmClock className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className="font-medium">
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              flight.status === "Scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : flight.status === "In Air"
                                  ? "bg-green-100 text-green-800"
                                  : flight.status === "Delayed"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : flight.status === "Cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {flight.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <Clock className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">
                          {durationHours}h {durationMinutes}m
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Departure Info */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-navy-800">
                    Departure
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <MapPin className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Airport</div>
                        <div className="font-medium">
                          {departureAirport?.name} ({flight.departureairport})
                        </div>
                        <div className="text-sm text-gray-500">
                          {departureAirport?.city}, {departureAirport?.country}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <Calendar className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Departure Time
                        </div>
                        <div className="font-medium">
                          {formatDate(flight.departuretime)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <Building2 className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Terminal & Gate
                        </div>
                        <div className="font-medium">
                          Terminal {flight.terminal}, Gate {flight.gate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrival Info */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-navy-800">
                    Arrival
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <MapPin className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Airport</div>
                        <div className="font-medium">
                          {arrivalAirport?.name} ({flight.arrivalairport})
                        </div>
                        <div className="text-sm text-gray-500">
                          {arrivalAirport?.city}, {arrivalAirport?.country}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <Calendar className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Arrival Time
                        </div>
                        <div className="font-medium">
                          {formatDate(flight.arrivaltime)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="route">
            <TabsList className="mb-6">
              <TabsTrigger value="route">Flight Route</TabsTrigger>
              <TabsTrigger value="controller">
                Air Traffic Controller
              </TabsTrigger>
              <TabsTrigger value="passengers">
                Passengers ({tickets.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="route" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Flight Route</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-xl font-bold">
                        {flight.departureairport}
                      </div>
                      <div className="text-sm text-gray-500">
                        {departureAirport?.city}
                      </div>
                      <div className="text-xs">
                        {new Date(flight.departuretime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    <div className="flex flex-grow flex-col items-center px-6">
                      <div className="relative h-1 w-full bg-gray-200">
                        <div className="absolute -top-2 left-0 h-4 w-4 rounded-full bg-skyblue-500"></div>
                        <div className="absolute -top-2 right-0 h-4 w-4 rounded-full bg-skyblue-500"></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {durationHours}h {durationMinutes}m
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xl font-bold">
                        {flight.arrivalairport}
                      </div>
                      <div className="text-sm text-gray-500">
                        {arrivalAirport?.city}
                      </div>
                      <div className="text-xs">
                        {new Date(flight.arrivaltime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Button asChild variant="outline">
                      <Link href={`/airports/${departureAirport?.id}`}>
                        <Building2 className="mr-2 h-4 w-4" />
                        View Departure Airport
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/airports/${arrivalAirport?.id}`}>
                        <Building2 className="mr-2 h-4 w-4" />
                        View Arrival Airport
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="controller" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Air Traffic Controller</CardTitle>
                </CardHeader>
                <CardContent>
                  {controller ? (
                    <div className="flex flex-col items-start gap-6 md:flex-row">
                      <div className="rounded-full bg-skyblue-100 p-6">
                        <User className="h-12 w-12 text-skyblue-600" />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="text-sm text-gray-500">Name</div>
                          <div className="text-lg font-medium">
                            {controller.name}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-500">Position</div>
                          <div className="font-medium">
                            {controller.position}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-500">
                            Contact Information
                          </div>
                          <div>{controller.email}</div>
                          <div>{controller.contactnumber}</div>
                        </div>

                        <div className="pt-4">
                          <Button asChild>
                            <Link href={`/controllers/${controller.id}`}>
                              View Controller Profile
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      No controller assigned to this flight.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="passengers" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Passenger Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {tickets.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Passenger</TableHead>
                            <TableHead>Seat</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Booking Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                              <TableCell>
                                <div className="font-medium">
                                  Passenger #{ticket.passengerpassportnumber}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{ticket.seat}</div>
                              </TableCell>
                              <TableCell>{ticket.class}</TableCell>
                              <TableCell>
                                {formatDate(ticket.bookingdate)}
                              </TableCell>
                              <TableCell>
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                  {ticket.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button asChild variant="outline" size="sm">
                                  <Link href={`/tickets/${ticket.id}`}>
                                    View Ticket
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      No passengers booked on this flight yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FlightDetailsPage;
