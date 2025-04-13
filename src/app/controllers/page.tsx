"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { controllers } from "@/data/mockData";
import { Search } from "lucide-react";
import type { Controller } from "@/lib/types";

const ControllersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredControllers = controllers.filter((controller) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      controller.name.toLowerCase().includes(searchValue) ||
      controller.position.toLowerCase().includes(searchValue) ||
      controller.email.toLowerCase().includes(searchValue) ||
      controller.airports.some(code => code.toLowerCase().includes(searchValue))
    );
  });
  
  const columns: { key: keyof Controller; title: string }[] = [
    { key: "name", title: "Name" },
    { key: "position", title: "Position" },
    { key: "airports", title: "Airports" },
    { key: "contactNumber", title: "Contact" },
    { key: "email", title: "Email" },
  ];
  
  // Format the data to display airports as a comma-separated string
  const formattedData = filteredControllers.map(controller => ({
    ...controller,
    airports: controller.airports.join(", ")
  }));
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <PageHeader 
            title="Air Traffic Controllers" 
            description="View all air traffic controllers in the SkyServe network"
          />
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search by name, position, airport..."
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
            title="All Controllers"
            columns={columns}
            data={formattedData}
            linkPath="/controllers"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ControllersPage;
