"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Search } from "lucide-react";
import type { Controller } from "@/lib/types";

const ControllersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [controllers, setControllers] = useState<Controller[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controllerRes = await axios.get<Controller[]>("/api/controllers");
        setControllers(controllerRes.data);
        console.log(controllerRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    void fetchData();
  }, []);
  
  const filteredControllers = controllers.filter((controller) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      controller.name.toLowerCase().includes(searchValue) ||
      controller.position.toLowerCase().includes(searchValue) ||
      controller.email.toLowerCase().includes(searchValue) ||
      controller.airportcode.toLowerCase().includes(searchValue)
    );
  });
  
  const columns: { key: keyof Controller; title: string }[] = [
    { key: "name", title: "Name" },
    { key: "position", title: "Position" },
    { key: "airportcode", title: "Airports" },
    { key: "contactnumber", title: "Contact" },
    { key: "email", title: "Email" },
  ];
  
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
            data={filteredControllers}
            linkPath="/controllers"
            tableName="Controller"
            idField="id"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ControllersPage;
