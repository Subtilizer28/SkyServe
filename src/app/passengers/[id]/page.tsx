"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { User, Phone, Mail, Flag, Ticket, CreditCard } from "lucide-react";
import {
  getPassengerById,
  getTicketsByPassenger,
  getFlightById,
  formatDate,
  formatCurrency,
} from "@/data/mockData";
import type { Tickets } from "@/lib/types";

const PassengerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const passenger = getPassengerById(id || "");
  
  if (!passenger) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Passenger Not Found</h1>
            <p className="mb-6">The passenger you are looking for does not exist or may have been removed.</p>
            <Button asChild>
              <Link href="/passengers">Back to Passengers</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const tickets = getTicketsByPassenger(passenger.id);
  
  // Enhance tickets with flight information
  const enhancedTickets = tickets.map(ticket => {
    const flight = getFlightById(ticket.flightId);
    return {
      ...ticket,
      flightNumber: flight?.flightNumber ?? 'N/A',
      departureAirport: flight?.departureAirport ?? 'N/A',
      arrivalAirport: flight?.arrivalAirport ?? 'N/A',
      departureTime: flight ? formatDate(flight.departureTime) : 'N/A',
      formattedPrice: formatCurrency(ticket.price),
    };
  });
  
  // Columns for ticket table
  const ticketColumns: { key: keyof Tickets; title: string }[] = [
    { key: "flightNumber", title: "Flight" },
    { key: "departureAirport", title: "From" },
    { key: "arrivalAirport", title: "To" },
    { key: "seat", title: "Seat" },
    { key: "class", title: "Class" },
    { key: "formattedPrice", title: "Price" },
    { key: "status", title: "Status" },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <PageHeader 
            title={passenger.name}
            description={`Passenger ID: ${passenger.id}`}
            actions={
              <div className="flex gap-4">
                <Button asChild variant="outline">
                  <Link href="/passengers">Back to Passengers</Link>
                </Button>
                <Button asChild>
                  <Link href="/tickets/new">Book New Ticket</Link>
                </Button>
              </div>
            }
          />
          
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Passenger Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="bg-skyblue-100 p-6 rounded-full">
                      <User className="h-12 w-12 text-skyblue-600" />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500">Full Name</div>
                        <div className="text-lg font-medium">{passenger.name}</div>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="font-medium">{passenger.email}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Phone</div>
                          <div className="font-medium">{passenger.contactNumber}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Flag className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Nationality</div>
                        <div className="font-medium">{passenger.nationality}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Passport Number</div>
                        <div className="font-medium">{passenger.passportNumber}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Ticket className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Total Bookings</div>
                        <div className="font-medium">{tickets.length}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Ticket History</CardTitle>
            </CardHeader>
            <CardContent>
              {enhancedTickets.length > 0 ? (
                <DataTable<Tickets>
                  title="" 
                  columns={ticketColumns} 
                  data={enhancedTickets} 
                  linkPath="/tickets" 
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No tickets booked by this passenger.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PassengerDetailsPage;
