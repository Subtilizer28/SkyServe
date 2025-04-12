"use client";
import Link from "next/link";
import { PlaneTakeoff, MapPin, Ticket, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailCard from "@/components/DetailCard";
import { airports, flights } from "@/data/mockData";

const Index = () => {
  const recentFlights = flights.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-skyblue-600 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Aviation Management Made Simple
                </h1>
                <p className="text-xl mb-8">
                  SkyServe provides comprehensive solutions for airlines, airports, and passengers.
                  Book flights, track status, and manage aviation services all in one place.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-skyblue-700 hover:bg-gray-100">
                    <Link href="/flights">View Flights</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-skyblue-700">
                    <Link href="/tickets/new">Book a Ticket</Link>
                  </Button>
                </div>
              </div>
              <div className="block -mt-[450px] md:-mt-0">
                <div className="relative h-80 animate-float">
                  <PlaneTakeoff className="h-80 w-80 text-white/20 absolute" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy-800">Our Services</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                SkyServe provides end-to-end solutions for the aviation industry, connecting airports, flights, controllers, and passengers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-skyblue-100 p-3 rounded-full w-fit mb-4">
                  <PlaneTakeoff className="h-6 w-6 text-skyblue-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-2">Flight Management</h3>
                <p className="text-gray-600 mb-4">
                  Track and manage flights, schedules, and assignments across all airports in the network.
                </p>
                <Button asChild variant="ghost" className="text-skyblue-600 p-0 hover:text-skyblue-800 hover:bg-transparent">
                  <Link href="/flights" className="flex items-center">
                    View Flights <span className="ml-1">→</span>
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-skyblue-100 p-3 rounded-full w-fit mb-4">
                  <Building2 className="h-6 w-6 text-skyblue-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-2">Airport Operations</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive airport management including terminal operations and controller assignments.
                </p>
                <Button asChild variant="ghost" className="text-skyblue-600 p-0 hover:text-skyblue-800 hover:bg-transparent">
                  <Link href="/airports" className="flex items-center">
                    View Airports <span className="ml-1">→</span>
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-skyblue-100 p-3 rounded-full w-fit mb-4">
                  <Ticket className="h-6 w-6 text-skyblue-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-2">Ticket Booking</h3>
                <p className="text-gray-600 mb-4">
                  Easy and efficient ticket booking system with seat selection and passenger management.
                </p>
                <Button asChild variant="ghost" className="text-skyblue-600 p-0 hover:text-skyblue-800 hover:bg-transparent">
                  <Link href="/tickets/new" className="flex items-center">
                    Book a Ticket <span className="ml-1">→</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recent Flights Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-navy-800">Recent Flights</h2>
              <Button asChild variant="outline" className="text-skyblue-600 border-skyblue-600 hover:bg-skyblue-50">
                <Link href="/flights">View All Flights</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentFlights.map((flight) => (
                <DetailCard key={flight.id} title={`Flight ${flight.flightNumber}`} className="h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-500">{flight.departureAirport} → {flight.arrivalAirport}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      flight.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      flight.status === 'In Air' ? 'bg-green-100 text-green-800' :
                      flight.status === 'Delayed' ? 'bg-yellow-100 text-yellow-800' :
                      flight.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {flight.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-500">Departure</div>
                    <div className="font-medium">{new Date(flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    <div className="text-sm">{new Date(flight.departureTime).toLocaleDateString()}</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-500">Arrival</div>
                    <div className="font-medium">{new Date(flight.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    <div className="text-sm">{new Date(flight.arrivalTime).toLocaleDateString()}</div>
                  </div>
                  
                  <Button asChild variant="default" className="w-full mt-2 bg-skyblue-600 hover:bg-skyblue-700">
                    <Link href={`/flights/${flight.id}`}>View Details</Link>
                  </Button>
                </DetailCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* Airport Overview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-navy-800">Our Airport Network</h2>
              <Button asChild variant="outline" className="text-skyblue-600 border-skyblue-600 hover:bg-skyblue-50">
                <Link href="/airports">View All Airports</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {airports.map((airport) => (
                <Link href={`/airports/${airport.id}`} key={airport.id}>
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                    <div className="text-2xl font-bold text-navy-800 mb-1">{airport.code}</div>
                    <div className="text-sm text-gray-600">{airport.city}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-navy-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Book your next flight with SkyServe and experience seamless aviation management.
            </p>
            <Button asChild size="lg" className="bg-skyblue-500 hover:bg-skyblue-600">
              <Link href="/tickets/new">Book a Ticket Now</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;