"use client";
import { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { PlaneTakeoff, User, CreditCard, Armchair } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Flight, Passenger } from "@/lib/types";

const BookTicketPage = () => {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [selectedFlightId, setSelectedFlightId] = useState("");
  const [selectedPassengerId, setSelectedPassengerId] = useState("");
  const [seatClass, setSeatClass] = useState("Economy");
  const [seatNumber, setSeatNumber] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      const [flightsRes, passengersRes] = await Promise.all([
        axios.get<Flight[]>("/api/flights"),
        axios.get<Passenger[]>("/api/passengers"),
      ]);
      setFlights(flightsRes.data);
      setPassengers(passengersRes.data);
    };
    void fetchData();
  }, []);

  const getBasePrice = () => {
    switch (seatClass) {
      case "Economy": return 6250;
      case "Business": return 25400;
      case "First": return 56000;
      default: return 0;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFlightId || !selectedPassengerId || !seatClass || !seatNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const price = getBasePrice() + 85;

    try {
      const res = await axios.post("/api/tickets/new", {
        passengerId: selectedPassengerId,
        flightId: selectedFlightId,
        seat: seatNumber,
        bookingDate: new Date().toISOString(),
        class: seatClass,
        status: "Confirmed",
        price,
      });

      toast({ title: "Success", description: "Ticket booked successfully!" });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      router.push(`/tickets/${res.data.id}`);
    } catch (err) {
      console.error("Booking failed:", err);
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const selectedFlight = flights.find((f) => f.id === selectedFlightId);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <PageHeader 
            title="Book a New Ticket" 
            description="Reserve a seat on an upcoming flight"
            actions={
              <Button asChild variant="outline">
                <Link href="/tickets">Back to Tickets</Link>
              </Button>
            }
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Flight
                      </label>
                      <Select value={selectedFlightId} onValueChange={setSelectedFlightId}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a flight" />
                        </SelectTrigger>
                        <SelectContent>
                          {flights.map((flight) => (
                            <SelectItem key={flight.id} value={flight.id}>
                              {`${flight.flightnumber} - ${flight.departureairport} to ${flight.arrivalairport} (${formatDate(flight.departuretime)})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Passenger
                      </label>
                      <Select value={selectedPassengerId} onValueChange={setSelectedPassengerId}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a passenger" />
                        </SelectTrigger>
                        <SelectContent>
                          {passengers.map((passenger) => (
                            <SelectItem key={passenger.passportnumber} value={passenger.passportnumber}>
                              {passenger.name} - {passenger.passportnumber}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Class
                        </label>
                        <Select value={seatClass} onValueChange={setSeatClass}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Economy">Economy</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="First">First</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Seat Number
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g., 12A"
                          value={seatNumber}
                          onChange={(e) => setSeatNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full bg-skyblue-600 hover:bg-skyblue-700">
                        Book Ticket
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedFlightId ? (
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <PlaneTakeoff className="h-5 w-5 text-skyblue-600 mr-3 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-500">Flight</div>
                            <div className="font-medium">{selectedFlight?.flightnumber}</div>
                            <div className="text-sm">{selectedFlight?.departureairport} → {selectedFlight?.arrivalairport}</div>
                            <div className="text-sm">{formatDate(selectedFlight?.departuretime ?? "")}</div>
                          </div>
                        </div>
                        
                        {selectedPassengerId && (
                          <div className="flex items-start">
                            <User className="h-5 w-5 text-skyblue-600 mr-3 mt-0.5" />
                            <div>
                              <div className="text-sm text-gray-500">Passenger</div>
                              <div className="font-medium">
                                {passengers.find(p => p.passportnumber === selectedPassengerId)?.name}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {seatClass && (
                          <div className="flex items-start">
                            <Armchair className="h-5 w-5 text-skyblue-600 mr-3 mt-0.5" />
                            <div>
                              <div className="text-sm text-gray-500">Class & Seat</div>
                              <div className="font-medium">{seatClass} {seatNumber && `- Seat ${seatNumber}`}</div>
                            </div>
                          </div>
                        )}
                        
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-medium">Base Price:</div>
                            <div>
                              {seatClass === "Economy" ? "$300.00" : 
                                seatClass === "Business" ? "$1,200.00" : 
                                seatClass === "First" ? "$3,500.00" : "$0.00"}
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-1 text-sm text-gray-500">
                            <div>Taxes & Fees:</div>
                            <div>$85.00</div>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t mt-2">
                            <div className="font-bold text-lg">Total:</div>
                            <div className="font-bold text-lg">
                              {seatClass === "Economy" ? "$385.00" : 
                                seatClass === "Business" ? "$1,285.00" : 
                                seatClass === "First" ? "$3,585.00" : "$0.00"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <div className="flex justify-center mb-4">
                          <CreditCard className="h-12 w-12 text-gray-300" />
                        </div>
                        <p>Select a flight to see the booking summary</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookTicketPage;
