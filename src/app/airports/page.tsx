"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { airports } from "@/data/mockData";
import { Search } from "lucide-react";
import { type Airport } from "@/lib/types";

const AirportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredAirports = airports.filter((airport) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      airport.name.toLowerCase().includes(searchValue) ||
      airport.code.toLowerCase().includes(searchValue) ||
      airport.city.toLowerCase().includes(searchValue) ||
      airport.country.toLowerCase().includes(searchValue)
    );
  });
  
  const columns: { key: keyof Airport; title: string }[] = [
    { key: "code", title: "Code" },
    { key: "name", title: "Name" },
    { key: "city", title: "City" },
    { key: "country", title: "Country" },
    { key: "terminals", title: "Terminals" },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <PageHeader 
            title="Airports" 
            description="View all airports in the SkyServe network"
          />
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search by airport name, code, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <Button onClick={() => setSearchTerm("")} variant="outline">
              Reset
            </Button>
          </div>
          
          <DataTable
            title="All Airports"
            columns={columns}
            data={filteredAirports}
            linkPath="/airports"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AirportsPage;
