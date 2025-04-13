"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff } from "lucide-react";

const NotFound = () => {
  const location = usePathname();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="bg-skyblue-100 p-4 rounded-full">
            <PlaneTakeoff className="h-16 w-16 text-skyblue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-navy-800 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you are looking for seems to have flown away. Please check the URL or navigate back to the home page.
        </p>
        <div className="space-y-4">
          <Button asChild size="lg" className="w-full bg-skyblue-600 hover:bg-skyblue-700">
            <Link href="/">Return to Home</Link>
          </Button>
          <div className="text-sm text-gray-500">
            Error: Route {location} not found
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
