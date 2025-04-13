"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { tickets, getFlightById, getPassengerById, formatCurrency, formatDate } from "@/data/mockData";
import { Search, PlusCircle } from "lucide-react";
import { type Tickets } from "@/lib/types";

const TicketsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("");
  
  // Enhance tickets with flight and passenger information
  const enhancedTickets = tickets.map(ticket => {
    const flight = getFlightById(ticket.flightId);
    const passenger = getPassengerById(ticket.passengerId);
    
    return {
      ...ticket,
      flightNumber: flight?.flightNumber ?? 'N/A',
      passengerName: passenger?.name ?? 'N/A',
      route: flight ? `${flight.departureAirport} → ${flight.arrivalAirport}` : 'N/A',
      departureTime: flight ? formatDate(flight.departureTime) : 'N/A',
      formattedPrice: formatCurrency(ticket.price),
      formattedBookingDate: formatDate(ticket.bookingDate),
    };
  });
  
  const filteredTickets = enhancedTickets.filter((ticket) => {
    const searchValue = searchTerm.toLowerCase();
    const matchesSearch = 
      ticket.flightNumber.toLowerCase().includes(searchValue) ||
      ticket.passengerName.toLowerCase().includes(searchValue) ||
      ticket.route.toLowerCase().includes(searchValue) ||
      ticket.seat.toLowerCase().includes(searchValue);
    
    const matchesClass = classFilter === "" || ticket.class === classFilter;
    
    return matchesSearch && matchesClass;
  });
  
  const columns: { key: keyof Tickets; title: string }[] = [
    { key: "flightNumber", title: "Flight" },
    { key: "passengerName", title: "Passenger" },
    { key: "route", title: "Route" },
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
            title="Tickets" 
            description="View all booked tickets in the system"
            actions={
              <Button asChild>
                <Link href="/tickets/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> Book New Ticket
                </Link>
              </Button>
            }
          />
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search by flight, passenger, route..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="w-full sm:w-48">
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Classes</SelectItem>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="First">First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={() => { setSearchTerm(""); setClassFilter(""); }} variant="outline">
              Reset
            </Button>
          </div>
          
          <DataTable
            title="All Tickets"
            columns={columns}
            data={filteredTickets}
            linkPath="/tickets"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TicketsPage;
