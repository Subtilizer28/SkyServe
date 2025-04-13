"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Calendar, User, Clock, PlaneTakeoff, PlaneLanding } from "lucide-react";
import {
  getTicketById,
  getFlightById,
  getPassengerById,
  getAirportByCode,
  formatDate,
  formatCurrency,
} from "@/data/mockData";

const TicketDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const ticket = getTicketById(id || "");
  
  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Ticket Not Found</h1>
            <p className="mb-6">The ticket you are looking for does not exist or may have been removed.</p>
            <Button asChild>
              <Link href="/tickets">Back to Tickets</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const flight = getFlightById(ticket.flightId);
  const passenger = getPassengerById(ticket.passengerId);
  
  if (!flight || !passenger) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid Ticket Data</h1>
            <p className="mb-6">The flight or passenger information for this ticket cannot be found.</p>
            <Button asChild>
              <Link href="/tickets">Back to Tickets</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const departureAirport = getAirportByCode(flight.departureAirport);
  const arrivalAirport = getAirportByCode(flight.arrivalAirport);
  
  // Calculate flight duration
  const departureTime = new Date(flight.departureTime);
  const arrivalTime = new Date(flight.arrivalTime);
  const durationMs = arrivalTime.getTime() - departureTime.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <PageHeader 
            title={`Ticket #${ticket.id}`}
            description={`Flight ${flight.flightNumber} • ${formatDate(flight.departureTime)}`}
            actions={
              <div className="flex gap-4">
                <Button asChild variant="outline">
                  <Link href="/tickets">Back to Tickets</Link>
                </Button>
                <Button asChild>
                  <Link href="/tickets/new">Book New Ticket</Link>
                </Button>
              </div>
            }
          />
          
          <div className="mb-8">
            <Card className="overflow-hidden">
              <div className="bg-skyblue-600 text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold">{flight.airline}</h3>
                    <p className="text-skyblue-100">Flight {flight.flightNumber}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{ticket.class} Class</div>
                    <div className="text-skyblue-100">Seat {ticket.seat}</div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-0">
                <div className="p-6 bg-white">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-6 md:mb-0">
                      <div className="text-sm text-gray-500 mb-1">Passenger</div>
                      <div className="flex items-start">
                        <User className="h-5 w-5 text-gray-500 mr-2" />
                        <div>
                          <div className="font-medium">{passenger.name}</div>
                          <div className="text-sm text-gray-500">{passenger.passportNumber}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Booking Information</div>
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                        <div>
                          <div className="font-medium">Booked on {formatDate(ticket.bookingDate)}</div>
                          <div className="text-sm text-gray-500">Price: {formatCurrency(ticket.price)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 mb-6 md:mb-0">
                      <div className="text-sm text-gray-500 mb-3">Departure</div>
                      <div className="flex items-start mb-3">
                        <PlaneTakeoff className="h-5 w-5 text-skyblue-600 mr-2" />
                        <div>
                          <div className="font-bold text-lg">{departureAirport?.code}</div>
                          <div>{departureAirport?.name}</div>
                          <div className="text-sm text-gray-500">{departureAirport?.city}, {departureAirport?.country}</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gray-500 mr-2" />
                        <div>
                          <div className="font-medium">{formatDate(flight.departureTime)}</div>
                          <div className="text-sm text-gray-500">Terminal {flight.terminal}, Gate {flight.gate}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex items-center px-6">
                      <div className="w-24 h-1 bg-gray-200 relative">
                        <div className="absolute -top-2 left-0 w-4 h-4 rounded-full bg-skyblue-500"></div>
                        <div className="absolute -top-2 right-0 w-4 h-4 rounded-full bg-skyblue-500"></div>
                        <div className="text-xs text-center text-gray-500 mt-4">{durationHours}h {durationMinutes}m</div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-3">Arrival</div>
                      <div className="flex items-start mb-3">
                        <PlaneLanding className="h-5 w-5 text-skyblue-600 mr-2" />
                        <div>
                          <div className="font-bold text-lg">{arrivalAirport?.code}</div>
                          <div>{arrivalAirport?.name}</div>
                          <div className="text-sm text-gray-500">{arrivalAirport?.city}, {arrivalAirport?.country}</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gray-500 mr-2" />
                        <div>
                          <div className="font-medium">{formatDate(flight.arrivalTime)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:hidden flex justify-center my-6">
                    <div className="flex flex-col items-center">
                      <div className="w-full h-1 bg-gray-200 relative">
                        <div className="absolute -top-2 left-0 w-4 h-4 rounded-full bg-skyblue-500"></div>
                        <div className="absolute -top-2 right-0 w-4 h-4 rounded-full bg-skyblue-500"></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-4">{durationHours}h {durationMinutes}m</div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        ticket.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        ticket.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button asChild variant="outline">
                        <Link href={`/flights/${flight.id}`}>View Flight</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href={`/passengers/${passenger.id}`}>View Passenger</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TicketDetailsPage;
