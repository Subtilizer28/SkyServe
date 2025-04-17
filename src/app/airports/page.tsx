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
import { type Airport } from "@/lib/types";

const AirportsPage = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const airportsRes = await axios.get<Airport[]>("/api/airports");
        setAirports(airportsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    void fetchData();
  }, []);

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
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="page-container">
          <PageHeader
            title="Airports"
            description="View all airports in the SkyServe network"
          />

          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
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
            tableName="Airport"
            idField="id"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AirportsPage;
