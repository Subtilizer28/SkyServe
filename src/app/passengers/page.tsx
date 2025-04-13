
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { passengers } from "@/data/mockData";
import { Search } from "lucide-react";
import type { Passenger } from "@/lib/types";

const PassengersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPassengers = passengers.filter((passenger) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      passenger.name.toLowerCase().includes(searchValue) ||
      passenger.email.toLowerCase().includes(searchValue) ||
      passenger.nationality.toLowerCase().includes(searchValue) ||
      passenger.passportNumber.toLowerCase().includes(searchValue)
    );
  });
  
  const columns: { key: keyof Passenger; title: string }[] = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "nationality", title: "Nationality" },
    { key: "passportNumber", title: "Passport" },
    { key: "contactNumber", title: "Contact" },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="page-container">
          <PageHeader 
            title="Passengers" 
            description="View all registered passengers in the SkyServe system"
          />
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search by name, email, nationality..."
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
            title="All Passengers"
            columns={columns}
            data={filteredPassengers}
            linkPath="/passengers"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PassengersPage;
