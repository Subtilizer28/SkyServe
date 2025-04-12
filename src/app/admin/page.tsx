"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { PlaneTakeoff, Building2, Users, User, Ticket, BarChart3 } from "lucide-react";
import { flights, airports, controllers, passengers, tickets } from "@/data/mockData";

const AdminPage = () => {
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <PageHeader 
            title="Admin Dashboard" 
            description="Manage flights, airports, controllers, and passengers"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{stat.title}</CardTitle>
                    <div className="bg-skyblue-100 p-2 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={stat.link}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Link href="/flights" className="w-full h-full">
                      <PlaneTakeoff className="h-6 w-6 mb-2" />
                      <span>Manage Flights</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Link href="/airports" className="w-full h-full">
                      <Building2 className="h-6 w-6 mb-2" />
                      <span>Manage Airports</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Link href="/controllers" className="w-full h-full">
                      <Users className="h-6 w-6 mb-2" />
                      <span>Manage Controllers</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Link href="/passengers" className="w-full h-full">
                      <User className="h-6 w-6 mb-2" />
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
                  <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Link href="/tickets" className="w-full h-full">
                      <Ticket className="h-6 w-6 mb-2" />
                      <span>Manage Tickets</span>
                    </Link>
                  </Button>
                  
                  <Button asChild className="h-24 flex flex-col items-center justify-center bg-skyblue-600 hover:bg-skyblue-700">
                    <Link href="/tickets/new" className="w-full h-full">
                      <PlaneTakeoff className="h-6 w-6 mb-2" />
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
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <BarChart3 className="h-16 w-16 text-skyblue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">SkyServe Aviation Management System</h3>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  Welcome to the admin dashboard for SkyServe. This system provides comprehensive
                  management tools for flights, airports, air traffic controllers, passengers, and ticket bookings
                  in the aviation network.
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
