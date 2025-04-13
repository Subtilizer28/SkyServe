"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { User, Phone, Mail, Building2 } from "lucide-react";
import {
  getControllerById,
  getFlightsByController,
  getAirportByCode,
  formatDate,
} from "@/data/mockData";
import type { Flight } from "@/lib/types";

const ControllerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const controller = getControllerById(id || "");
  
  if (!controller) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Controller Not Found</h1>
            <p className="mb-6">The controller you are looking for does not exist or may have been removed.</p>
            <Button asChild>
              <Link href="/controllers">Back to Controllers</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const flights = getFlightsByController(controller.id);
  
  // Get airport details for each assigned airport
  const assignedAirports = controller.airports.map(code => {
    const airport = getAirportByCode(code);
    return airport ? {
      id: airport.id,
      code: airport.code,
      name: airport.name,
      city: airport.city,
      country: airport.country
    } : null;
  }).filter(Boolean);
  
  // Columns for flight table
  const flightColumns: { key: keyof Flight; title: string }[] = [
    { key: "flightNumber", title: "Flight" },
    { key: "airline", title: "Airline" },
    { key: "departureAirport", title: "From" },
    { key: "arrivalAirport", title: "To" },
    { key: "departureTime", title: "Departure" },
    { key: "status", title: "Status" },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <PageHeader 
            title={controller.name}
            description={`${controller.position}`}
            actions={
              <Button asChild variant="outline">
                <Link href="/controllers">Back to Controllers</Link>
              </Button>
            }
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Controller Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <div className="bg-skyblue-100 p-6 rounded-full mb-4">
                      <User className="h-16 w-16 text-skyblue-600" />
                    </div>
                    <h2 className="text-xl font-bold">{controller.name}</h2>
                    <p className="text-gray-500">{controller.position}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium">{controller.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium">{controller.contactNumber}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Assigned Airports</CardTitle>
                </CardHeader>
                <CardContent>
                  {assignedAirports.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {assignedAirports.map((airport) => (
                        <div 
                          key={airport?.id} 
                          className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start">
                            <div className="bg-skyblue-100 p-2 rounded-full mr-3">
                              <Building2 className="h-5 w-5 text-skyblue-600" />
                            </div>
                            <div>
                              <div className="font-bold">{airport?.code}</div>
                              <div className="text-sm">{airport?.name}</div>
                              <div className="text-xs text-gray-500">{airport?.city}, {airport?.country}</div>
                              <div className="mt-2">
                                <Button asChild variant="outline" size="sm">
                                  <Link href={`/airports/${airport?.id}`}>
                                    View Airport
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No airports assigned to this controller.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Assigned Flights</CardTitle>
            </CardHeader>
            <CardContent>
              {flights.length > 0 ? (
                <DataTable 
                  title="" 
                  columns={flightColumns} 
                  data={flights.map(flight => ({
                    ...flight, 
                    departureTime: formatDate(flight.departureTime),
                    arrivalTime: formatDate(flight.arrivalTime),
                  }))} 
                  linkPath="/flights" 
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No flights assigned to this controller.
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

export default ControllerDetailsPage;
