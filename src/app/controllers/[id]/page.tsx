"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { User, Phone, Mail, Building2 } from "lucide-react";
import type { Flight, Controller, Airport } from "@/lib/types";
import { formatDate } from "@/lib/format";

const ControllerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [controller, setController] = useState<Controller | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airport, setAirports] = useState<Airport | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const controllerRes = await axios.get<Controller>(
          `/api/controllers/${id}`,
        );
        setController(controllerRes.data);

        const flightsRes = await axios.get<Flight[]>(
          `/api/flights/by-controller/${id}`,
        );
        setFlights(flightsRes.data);

        const airportsData = await axios.get<Airport>(
          `/api/airports/by-code/${controllerRes.data.airportcode}`,
        );
        setAirports(airportsData.data);
      } catch (error) {
        console.error("Failed to fetch controller details:", error);
      }
    };

    void fetchData();
  }, [id]);

  if (!controller) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-grow items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Controller Not Found</h1>
            <p className="mb-6">
              The controller you are looking for does not exist or may have been
              removed.
            </p>
            <Button asChild>
              <Link href="/controllers">Back to Controllers</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Columns for flight table
  const flightColumns: { key: keyof Flight; title: string }[] = [
    { key: "flightnumber", title: "Flight" },
    { key: "airline", title: "Airline" },
    { key: "departureairport", title: "From" },
    { key: "arrivalairport", title: "To" },
    { key: "departuretime", title: "Departure" },
    { key: "status", title: "Status" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
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

          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Controller Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex flex-col items-center">
                    <div className="mb-4 rounded-full bg-skyblue-100 p-6">
                      <User className="h-16 w-16 text-skyblue-600" />
                    </div>
                    <h2 className="text-xl font-bold">{controller.name}</h2>
                    <p className="text-gray-500">{controller.position}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="mr-3 h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium">{controller.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium">
                          {controller.contactnumber}
                        </div>
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
                  <div
                    key={airport?.id}
                    className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-skyblue-100 p-2">
                        <Building2 className="h-5 w-5 text-skyblue-600" />
                      </div>
                      <div>
                        <div className="font-bold">{airport?.code}</div>
                        <div className="text-sm">{airport?.name}</div>
                        <div className="text-xs text-gray-500">
                          {airport?.city}, {airport?.country}
                        </div>
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
                  data={flights.map((flight) => ({
                    ...flight,
                    departureTime: formatDate(flight.departuretime),
                    arrivalTime: formatDate(flight.arrivaltime),
                  }))}
                  linkPath="/flights"
                  tableName="Flight"
                  idField="id"
                />
              ) : (
                <div className="py-8 text-center text-gray-500">
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
