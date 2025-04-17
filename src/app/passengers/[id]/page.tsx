"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { User, Phone, Mail, Flag, Ticket, CreditCard } from "lucide-react";
import type { Tickets, Passenger } from "@/lib/types";
import { formatDate } from "@/lib/format";

const PassengerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [enhancedTickets, setEnhancedTickets] = useState<Tickets[]>([]);

  useEffect(() => {
    const fetchPassengerAndTickets = async () => {
      try {
        const resPassenger = await axios.get<Passenger>(`/api/passengers/${id}`);
        setPassenger(resPassenger.data);
        const resTickets = await axios.get<Tickets[]>(`/api/tickets/by-passenger/${passenger?.passportnumber}`);
        setTickets(resTickets.data);
      } catch (error) {
        console.error(error);
        setPassenger(null);
        setTickets([]);
      } finally {
        console.log("Fetching completed");
      }
    };

    if (id) {
      void fetchPassengerAndTickets();
    }
  }, [id, passenger?.passportnumber]);

  useEffect(() => {
    const enhanceTickets = async () => {
      if (tickets.length === 0) return;

      try {
        const results = await Promise.all(
          tickets.map(async (ticket) => {
            const resFlight = await fetch(`/api/flights/${ticket.flightid}`);
            if (!resFlight.ok) {
              return
            }

            return {
              ...ticket,
              flightid: ticket?.flightid ?? 'N/A',
              passengerpassportnumber: ticket?.passengerpassportnumber ?? 'N/A',
              bookingdate: ticket?.bookingdate ?? 'N/A',
              class: ticket?.class ? formatDate(ticket.class) : 'N/A',
              seat: ticket?.seat ?? 'N/A',
              status: ticket?.status ?? 'N/A',
              price: ticket?.price ?? 'N/A',
            };
          })
        );
        setEnhancedTickets(results.filter((ticket): ticket is Tickets => ticket !== undefined));
      } catch (error) {
        console.error("Error enhancing tickets", error);
      }
    };

    void enhanceTickets();
  }, [tickets]);
  
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
  
  // Columns for ticket table
  const ticketColumns: { key: keyof Tickets; title: string }[] = [
    { key: "flightid", title: "Flight" },
    { key: "passengerpassportnumber", title: "Passenger Passport Number" },
    { key: "bookingdate", title: "Booking Date" },
    { key: "seat", title: "Seat" },
    { key: "class", title: "Class" },
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
                          <div className="font-medium">{passenger.contactnumber}</div>
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
                        <div className="font-medium">{passenger.passportnumber}</div>
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
                  tableName="Ticket"
                  idField="id"
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
