"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { flights, formatDate, getAirportByCode } from "@/data/mockData";
import { Search, Calendar, MapPin } from "lucide-react";

const FlightsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  const filteredFlights = flights.filter((flight) => {
    const matchesSearch = 
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.departureAirport.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.arrivalAirport.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "" || flight.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <PageHeader 
            title="All Flights" 
            description="View and search all flights within the SkyServe network."
          />
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Button onClick={() => { setSearchTerm(""); setStatusFilter(""); }}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No flights found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFlights.map((flight) => {
                      const departureAirport = getAirportByCode(flight.departureAirport);
                      const arrivalAirport = getAirportByCode(flight.arrivalAirport);
                      
                      return (
                        <TableRow key={flight.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="font-medium">{flight.flightNumber}</div>
                            <div className="text-sm text-gray-500">{flight.airline}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="font-medium">{flight.departureAirport} → {flight.arrivalAirport}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {departureAirport?.city} to {arrivalAirport?.city}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                              <span>{formatDate(flight.departureTime)}</span>
                            </div>
                            <div className="text-sm text-gray-500">Terminal {flight.terminal}, Gate {flight.gate}</div>
                          </TableCell>
                          <TableCell>
                            <div>{formatDate(flight.arrivalTime)}</div>
                          </TableCell>
                          <TableCell>
                            <div>{flight.aircraft}</div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              flight.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                              flight.status === 'In Air' ? 'bg-green-100 text-green-800' :
                              flight.status === 'Delayed' ? 'bg-yellow-100 text-yellow-800' :
                              flight.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {flight.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/flights/${flight.id}`}>View Details</Link>
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
