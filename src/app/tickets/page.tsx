"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { formatCurrency, formatDate } from "@/lib/format";
import { Search, PlusCircle } from "lucide-react";
import { type Flight, type Passenger, type Tickets } from "@/lib/types";

const TicketsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [enhancedTickets, setEnhancedTickets] = useState<Tickets[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("");

  // Helper to enhance ticket with extra info
  const enhanceTickets = async (rawTickets: Tickets[]): Promise<Tickets[]> => {
    return Promise.all(
      rawTickets.map(async (ticket) => {
        try {
          const [flightRes, passengerRes] = await Promise.all([
            axios.get<Flight>(`/api/flights/${ticket.flightid}`),
            axios.get<Passenger>(
              `/api/passengers/by-pnumber/${ticket.passengerpassportnumber}`,
            ),
          ]);

          const flight = flightRes.data;
          const passenger = passengerRes.data;

          return {
            ...ticket,
            flightNumber: flight?.flightnumber ?? "N/A",
            passengerName: passenger?.name ?? "N/A",
            route: `${flight?.departureairport} → ${flight?.arrivalairport}`,
            departureTime: formatDate(flight?.departuretime),
            formattedPrice: formatCurrency(ticket.price),
            formattedBookingDate: formatDate(ticket.bookingdate),
          };
        } catch (err) {
          console.error("Error enhancing ticket", err);
          return {
            ...ticket,
            flightNumber: "N/A",
            passengerName: "N/A",
            route: "N/A",
            departureTime: "N/A",
            formattedPrice: formatCurrency(ticket.price),
            formattedBookingDate: formatDate(ticket.bookingdate),
          };
        }
      }),
    );
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get<Tickets[]>("/api/tickets");
        const rawTickets = res.data;
        setTickets(rawTickets);
        console.log("Tickets fetched:", rawTickets);

        const enhanced = await enhanceTickets(rawTickets);
        setEnhancedTickets(enhanced);
      } catch (err) {
        console.error("Error fetching tickets", err);
      }
    };

    void fetchTickets();
  }, []);

  const filteredTickets = enhancedTickets.filter((ticket) => {
    const searchValue = searchTerm.toLowerCase();

    const matchesSearch = [
      ticket.flightid,
      ticket.passengerpassportnumber,
      ticket.class,
      ticket.seat,
    ].some((field) => field?.toLowerCase().includes(searchValue));

    const matchesClass = classFilter === "" || ticket.class === classFilter;

    return matchesSearch && matchesClass;
  });

  const columns: { key: keyof Tickets; title: string }[] = [
    { key: "flightid", title: "Flight" },
    { key: "passengerpassportnumber", title: "Passenger" },
    { key: "class", title: "Class" },
    { key: "seat", title: "Seat" },
    { key: "price", title: "Price" },
    { key: "status", title: "Status" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
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

          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
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
                  <SelectItem value="null">All Classes</SelectItem>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="First">First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => {
                setSearchTerm("");
                setClassFilter("");
              }}
              variant="outline"
            >
              Reset
            </Button>
          </div>

          <DataTable<Tickets>
            title="All Tickets"
            columns={columns}
            data={filteredTickets}
            linkPath="/tickets"
            tableName="Tickets"
            idField="id"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TicketsPage;
