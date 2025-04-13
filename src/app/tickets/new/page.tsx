"use client";
import { useState } from "react";
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
import { flights, passengers, tickets, formatDate } from "@/data/mockData";

const BookTicketPage = () => {
  const navigate = useRouter();
  const [selectedFlightId, setSelectedFlightId] = useState("");
  const [selectedPassengerId, setSelectedPassengerId] = useState("");
  const [seatClass, setSeatClass] = useState("Economy");
  const [seatNumber, setSeatNumber] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFlightId || !selectedPassengerId || !seatClass || !seatNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would be an API call to create a new ticket
    const newTicketId = String(tickets.length + 1);
    
    toast({
      title: "Success!",
      description: "Ticket has been booked successfully",
    });
    
    // Redirect to ticket details page
    setTimeout(() => {
      navigate.push(`/tickets/${newTicketId}`);
    }, 1500);
  };
  
  const selectedFlight = flights.find(flight => flight.id === selectedFlightId);
  
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
                              {`${flight.flightNumber} - ${flight.departureAirport} to ${flight.arrivalAirport} (${formatDate(flight.departureTime)})`}
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
                            <SelectItem key={passenger.id} value={passenger.id}>
                              {passenger.name} - {passenger.passportNumber}
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
                            <div className="font-medium">{selectedFlight?.flightNumber}</div>
                            <div className="text-sm">{selectedFlight?.departureAirport} → {selectedFlight?.arrivalAirport}</div>
                            <div className="text-sm">{formatDate(selectedFlight?.departureTime ?? "")}</div>
                          </div>
                        </div>
                        
                        {selectedPassengerId && (
                          <div className="flex items-start">
                            <User className="h-5 w-5 text-skyblue-600 mr-3 mt-0.5" />
                            <div>
                              <div className="text-sm text-gray-500">Passenger</div>
                              <div className="font-medium">
                                {passengers.find(p => p.id === selectedPassengerId)?.name}
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
