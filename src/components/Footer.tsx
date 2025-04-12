
import Link from "next/link";
import { PlaneTakeoff } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <PlaneTakeoff className="h-6 w-auto text-skyblue-400" />
              <span className="ml-2 text-xl font-bold">SkyServe</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Your trusted aviation management system for airlines, airports, and passengers.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/flights" className="text-gray-300 hover:text-white">Flights</Link>
              </li>
              <li>
                <Link href="/airports" className="text-gray-300 hover:text-white">Airports</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/controllers" className="text-gray-300 hover:text-white">Controllers</Link>
              </li>
              <li>
                <Link href="/passengers" className="text-gray-300 hover:text-white">Passengers</Link>
              </li>
              <li>
                <Link href="/tickets" className="text-gray-300 hover:text-white">Tickets</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Book</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/tickets/new" className="text-gray-300 hover:text-white">Book a Ticket</Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-white">Admin</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-base text-gray-400">&copy; 2025 SkyServe Aviation Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
