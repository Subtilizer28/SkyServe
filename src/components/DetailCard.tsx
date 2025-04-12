
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ReactNode } from "react";

interface DetailCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DetailCard = ({ title, children, className = "" }: DetailCardProps) => {
  return (
    <Card className={`shadow-md hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className="bg-skyblue-50 border-b">
        <CardTitle className="text-navy-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
};

export default DetailCard;
