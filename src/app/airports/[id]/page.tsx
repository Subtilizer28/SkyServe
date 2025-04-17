"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import {
  MapPin,
  Building2,
  PlaneTakeoff,
  PlaneLanding,
  Users,
} from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Flight, Controller, Airport } from "@/lib/types";

const AirportDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [airport, setAirport] = useState<Airport>();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airportControllers, setControllers] = useState<Controller[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchAirport = async () => {
      try {
        const res = await axios.get<Airport>(`/api/airports/${id}`);
        setAirport(res.data);
      } catch (error) {
        console.error("Error fetching airport:", error);
      }
    };

    void fetchAirport();
  }, [id]);

  useEffect(() => {
    if (!airport?.code) return;

    const fetchRelatedData = async () => {
      try {
        const [flightsRes, controllersRes] = await Promise.all([
          axios.get<Flight[]>(`/api/flights/by-airport/${airport.code}`),
          axios.get<Controller[]>(
            `/api/controllers/by-airport/${airport.code}`,
          ),
        ]);

        setFlights(flightsRes.data);
        setControllers(controllersRes.data);
      } catch (error) {
        console.error("Error fetching related data:", error);
      } finally {
        console.log("Airport-related data fetched successfully");
      }
    };

    void fetchRelatedData();
  }, [airport?.code]);

  if (!airport) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-grow items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Airport Not Found</h1>
            <p className="mb-6">
              The airport you are looking for does not exist or may have been
              removed.
            </p>
            <Button asChild>
              <Link href="/airports">Back to Airports</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  const departureFlights = flights.filter(
    (f) => f.departureairport === airport.code,
  );
  const arrivalFlights = flights.filter(
    (f) => f.arrivalairport === airport.code,
  );
  // Columns for flight tables
  const flightColumns: { key: keyof Flight; title: string }[] = [
    { key: "flightnumber", title: "Flight No." },
    { key: "airline", title: "Airline" },
    { key: "departureairport", title: "From" },
    { key: "arrivalairport", title: "To" },
    { key: "departuretime", title: "Departure" },
    { key: "arrivaltime", title: "Arrival" },
    { key: "status", title: "Status" },
  ];

  const controllerColumns: { key: keyof Controller; title: string }[] = [
    { key: "name", title: "Name" },
    { key: "position", title: "Position" },
    { key: "contactnumber", title: "Contact" },
    { key: "email", title: "Email" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
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
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Airport Basic Info */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-navy-800">
                    Airport Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <Building2 className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Official Name
                        </div>
                        <div className="font-medium">{airport.name}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <MapPin className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium">
                          {airport.city}, {airport.country}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terminals Info */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-navy-800">
                    Terminals
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <Building2 className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Number of Terminals
                        </div>
                        <div className="font-medium">{airport.terminals}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flights Info */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-navy-800">
                    Flights
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <PlaneTakeoff className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Departures</div>
                        <div className="font-medium">
                          {departureFlights.length} flights
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <PlaneLanding className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Arrivals</div>
                        <div className="font-medium">
                          {arrivalFlights.length} flights
                        </div>
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
                <PlaneTakeoff className="mr-2 h-4 w-4" />
                Departures
              </TabsTrigger>
              <TabsTrigger value="arrivals">
                <PlaneLanding className="mr-2 h-4 w-4" />
                Arrivals
              </TabsTrigger>
              <TabsTrigger value="controllers">
                <Users className="mr-2 h-4 w-4" />
                Controllers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="departures" className="mt-0">
              {departureFlights.length > 0 ? (
                <DataTable
                  title={`Departures from ${airport.code}`}
                  columns={flightColumns}
                  data={departureFlights.map((flight) => ({
                    ...flight,
                    departureTime: formatDate(flight.departuretime),
                    arrivalTime: formatDate(flight.arrivaltime),
                  }))}
                  linkPath="/flights"
                  tableName="Flight"
                  idField="id"
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Departures from {airport.code}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="py-8 text-center text-gray-500">
                      No departure flights found.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="arrivals" className="mt-0">
              {arrivalFlights.length > 0 ? (
                <DataTable
                  title={`Arrivals to ${airport.code}`}
                  columns={flightColumns}
                  data={arrivalFlights.map((flight) => ({
                    ...flight,
                    departureTime: formatDate(flight.departuretime),
                    arrivalTime: formatDate(flight.arrivaltime),
                  }))}
                  linkPath="/flights"
                  tableName="Flight"
                  idField="id"
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Arrivals to {airport.code}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="py-8 text-center text-gray-500">
                      No arrival flights found.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="controllers" className="mt-0">
              {airportControllers?.length > 0 ? (
                <DataTable
                  title={`Controllers at ${airport.code}`}
                  columns={controllerColumns}
                  data={airportControllers}
                  linkPath="/controllers"
                  tableName="Controller"
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Controllers at {airport.code}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="py-8 text-center text-gray-500">
                      No controllers assigned to this airport.
                    </p>
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
