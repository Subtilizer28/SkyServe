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
import { formatDate } from "@/lib/format";
import { Search, Calendar, MapPin } from "lucide-react";
import type { Flight } from "@/lib/types";

const FlightsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await axios.get<Flight[]>("/api/flights");
        setFlights(res.data);
      } catch (error) {
        console.error("Error fetching flights", error);
      } finally {
        console.log("success");
      }
    };

    void fetchFlights();
  }, []);

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      flight.flightnumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.airline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.departureairport
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      flight.arrivalairport?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || flight.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="page-container">
          <PageHeader
            title="All Flights"
            description="View and search all flights within the SkyServe network."
          />

          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search flight number, airline..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="null">All Statuses</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="In Air">In Air</SelectItem>
                    <SelectItem value="Delayed">Delayed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="Landed">Landed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-right">
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flight</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Aircraft</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFlights.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="py-8 text-center text-muted-foreground"
                      >
                        No flights found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFlights.map((flight) => {
                      return (
                        <TableRow key={flight.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="font-medium">
                              {flight.flightnumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {flight.airline}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                              <span className="font-medium">
                                {flight.departureairport} →{" "}
                                {flight.arrivalairport}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {flight.departureairport} to{" "}
                              {flight.arrivalairport}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                              <span>{formatDate(flight.departuretime)}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              Terminal {flight.terminal}, Gate {flight.gate}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>{formatDate(flight.arrivaltime)}</div>
                          </TableCell>
                          <TableCell>
                            <div>{flight.aircraft}</div>
                          </TableCell>
                          <TableCell>
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
                          </TableCell>
                          <TableCell>
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/flights/${flight.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FlightsPage;
