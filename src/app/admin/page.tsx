"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import {
  PlaneTakeoff,
  Building2,
  Users,
  User,
  Ticket,
  BarChart3,
} from "lucide-react";
import type {
  Flight,
  Controller,
  Airport,
  Passenger,
  Tickets,
} from "@/lib/types";

const AdminPage = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [controllers, setControllers] = useState<Controller[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [tickets, setTickets] = useState<Tickets[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          flightsRes,
          airportsRes,
          controllersRes,
          passengersRes,
          ticketsRes,
        ] = await Promise.all([
          axios.get<Flight[]>("/api/flights"),
          axios.get<Airport[]>("/api/airports"),
          axios.get<Controller[]>("/api/controllers"),
          axios.get<Passenger[]>("/api/passengers"),
          axios.get<Tickets[]>("/api/tickets"),
        ]);

        setFlights(flightsRes.data);
        setAirports(airportsRes.data);
        setControllers(controllersRes.data);
        setPassengers(passengersRes.data);
        setTickets(ticketsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    void fetchData();
  }, []);
  const stats = [
    {
      title: "Total Flights",
      value: flights.length,
      icon: <PlaneTakeoff className="h-5 w-5 text-skyblue-600" />,
      link: "/flights",
    },
    {
      title: "Airports",
      value: airports.length,
      icon: <Building2 className="h-5 w-5 text-skyblue-600" />,
      link: "/airports",
    },
    {
      title: "Controllers",
      value: controllers.length,
      icon: <Users className="h-5 w-5 text-skyblue-600" />,
      link: "/controllers",
    },
    {
      title: "Passengers",
      value: passengers.length,
      icon: <User className="h-5 w-5 text-skyblue-600" />,
      link: "/passengers",
    },
    {
      title: "Booked Tickets",
      value: tickets.length,
      icon: <Ticket className="h-5 w-5 text-skyblue-600" />,
      link: "/tickets",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="page-container">
          <PageHeader
            title="Admin Dashboard"
            description="Manage flights, airports, controllers, and passengers"
          />

          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, index) => (
              <Card key={index} className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{stat.title}</CardTitle>
                    <div className="rounded-full bg-skyblue-100 p-2">
                      {stat.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-3xl font-bold">{stat.value}</div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href={stat.link}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Button
                    asChild
                    variant="outline"
                    className="flex h-24 flex-col items-center justify-center"
                  >
                    <Link href="/flights" className="h-full w-full">
                      <PlaneTakeoff className="mb-2 h-6 w-6" />
                      <span>Manage Flights</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="flex h-24 flex-col items-center justify-center"
                  >
                    <Link href="/airports" className="h-full w-full">
                      <Building2 className="mb-2 h-6 w-6" />
                      <span>Manage Airports</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="flex h-24 flex-col items-center justify-center"
                  >
                    <Link href="/controllers" className="h-full w-full">
                      <Users className="mb-2 h-6 w-6" />
                      <span>Manage Controllers</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="flex h-24 flex-col items-center justify-center"
                  >
                    <Link href="/passengers" className="h-full w-full">
                      <User className="mb-2 h-6 w-6" />
                      <span>Manage Passengers</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle>Tickets & Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="flex h-24 flex-col items-center justify-center"
                  >
                    <Link href="/tickets" className="h-full w-full">
                      <Ticket className="mb-2 h-6 w-6" />
                      <span>Manage Tickets</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="flex h-24 flex-col items-center justify-center bg-skyblue-600 hover:bg-skyblue-700"
                  >
                    <Link href="/tickets/new" className="h-full w-full">
                      <PlaneTakeoff className="mb-2 h-6 w-6" />
                      <span>Book New Ticket</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <div className="mb-4 flex justify-center">
                  <BarChart3 className="h-16 w-16 text-skyblue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  SkyServe Aviation Management System
                </h3>
                <p className="mx-auto max-w-2xl text-gray-500">
                  Welcome to the admin dashboard for SkyServe. This system
                  provides comprehensive management tools for flights, airports,
                  air traffic controllers, passengers, and ticket bookings in
                  the aviation network.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
