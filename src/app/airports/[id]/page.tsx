"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { MapPin, Building2, PlaneTakeoff, PlaneLanding, Users } from "lucide-react";
import {
  getAirportById,
  getFlightsByAirportCode,
  controllers,
  formatDate,
} from "@/data/mockData";
import type { Flight, Controller } from "@/lib/types";

const AirportDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const airport = getAirportById(id ?? "");
  
  if (!airport) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Airport Not Found</h1>
            <p className="mb-6">The airport you are looking for does not exist or may have been removed.</p>
            <Button asChild>
              <Link href="/airports">Back to Airports</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const flights = getFlightsByAirportCode(airport.code);
  const departureFlights = flights.filter(flight => flight.departureAirport === airport.code);
  const arrivalFlights = flights.filter(flight => flight.arrivalAirport === airport.code);
  
  // Filter controllers assigned to this airport
  const airportControllers = controllers.filter(controller => 
    controller.airports.includes(airport.code)
  );
  
  // Columns for flight tables
  const flightColumns: { key: keyof Flight; title: string }[] = [
    { key: "flightNumber", title: "Flight No." },
    { key: "airline", title: "Airline" },
    { key: "departureAirport", title: "From" },
    { key: "arrivalAirport", title: "To" },
    { key: "departureTime", title: "Departure" },
    { key: "arrivalTime", title: "Arrival" },
    { key: "status", title: "Status" },
  ];
  
  // Columns for controller table
  const controllerColumns: { key: keyof Controller; title: string }[] = [
    { key: "name", title: "Name" },
    { key: "position", title: "Position" },
    { key: "contactNumber", title: "Contact" },
    { key: "email", title: "Email" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <PageHeader 
            title={airport.name}
            description={`${airport.city}, ${airport.country} • Airport Code: ${airport.code}`}
            actions={
              <Button asChild variant="outline">
                <Link href="/airports">Back to Airports</Link>
              </Button>
            }
          />
          
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Airport Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-navy-800">Airport Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-skyblue-100 p-2 rounded-full mr-3">
                        <Building2 className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Official Name</div>
                        <div className="font-medium">{airport.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-skyblue-100 p-2 rounded-full mr-3">
                        <MapPin className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium">{airport.city}, {airport.country}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Terminals Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-navy-800">Terminals</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-skyblue-100 p-2 rounded-full mr-3">
                        <Building2 className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Number of Terminals</div>
                        <div className="font-medium">{airport.terminals}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Flights Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-navy-800">Flights</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-skyblue-100 p-2 rounded-full mr-3">
                        <PlaneTakeoff className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Departures</div>
                        <div className="font-medium">{departureFlights.length} flights</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-skyblue-100 p-2 rounded-full mr-3">
                        <PlaneLanding className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Arrivals</div>
                        <div className="font-medium">{arrivalFlights.length} flights</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="departures">
            <TabsList className="mb-6">
              <TabsTrigger value="departures">
                <PlaneTakeoff className="h-4 w-4 mr-2" />
                Departures
              </TabsTrigger>
              <TabsTrigger value="arrivals">
                <PlaneLanding className="h-4 w-4 mr-2" />
                Arrivals
              </TabsTrigger>
              <TabsTrigger value="controllers">
                <Users className="h-4 w-4 mr-2" />
                Controllers
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="departures" className="mt-0">
              {departureFlights.length > 0 ? (
                <DataTable 
                  title={`Departures from ${airport.code}`} 
                  columns={flightColumns} 
                  data={departureFlights.map(flight => ({
                    ...flight, 
                    departureTime: formatDate(flight.departureTime),
                    arrivalTime: formatDate(flight.arrivalTime),
                  }))} 
                  linkPath="/flights" 
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Departures from {airport.code}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-gray-500">No departure flights found.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="arrivals" className="mt-0">
              {arrivalFlights.length > 0 ? (
                <DataTable 
                  title={`Arrivals to ${airport.code}`} 
                  columns={flightColumns} 
                  data={arrivalFlights.map(flight => ({
                    ...flight, 
                    departureTime: formatDate(flight.departureTime),
                    arrivalTime: formatDate(flight.arrivalTime),
                  }))} 
                  linkPath="/flights" 
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Arrivals to {airport.code}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-gray-500">No arrival flights found.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="controllers" className="mt-0">
              {airportControllers.length > 0 ? (
                <DataTable 
                  title={`Controllers at ${airport.code}`} 
                  columns={controllerColumns} 
                  data={airportControllers} 
                  linkPath="/controllers" 
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Controllers at {airport.code}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-gray-500">No controllers assigned to this airport.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AirportDetailsPage;
