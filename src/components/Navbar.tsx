"use client";
import Link from "next/link";
import { Menu, X, PlaneTakeoff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Flights", path: "/flights" },
    { name: "Airports", path: "/airports" },
    { name: "Controllers", path: "/controllers" },
    { name: "Passengers", path: "/passengers" },
    { name: "Tickets", path: "/tickets" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <PlaneTakeoff className="h-8 w-auto text-skyblue-600" />
              <span className="ml-2 text-xl font-bold text-navy-800">SkyServe</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-skyblue-500 hover:text-navy-700 transition duration-150 ease-in-out"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-skyblue-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <Button asChild className="ml-4 bg-skyblue-600 hover:bg-skyblue-700">
              <Link href="/tickets/new">Book a Ticket</Link>
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-skyblue-500 hover:text-navy-700 transition duration-150 ease-in-out"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/tickets/new"
              className="block pl-3 pr-4 py-2 text-base font-medium text-white bg-skyblue-600 hover:bg-skyblue-700 transition duration-150 ease-in-out"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Ticket
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
