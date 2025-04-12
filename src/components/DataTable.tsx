/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Column<T extends object> {
  key: keyof T;
  title: string;
}

interface DataTableProps<T extends object> {
  title: string;
  columns: Column<T>[];
  data: T[];
  linkPath: string;
  idField?: keyof T;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const DataTable = <T extends { [key: string]: unknown }>({
  title,
  columns,
  data,
  linkPath,
  idField = "id" as keyof T,
}: DataTableProps<T>) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-skyblue-50">
        <CardTitle className="text-navy-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key as string} className="bg-white text-navy-700">
                    {column.title}
                  </TableHead>
                ))}
                <TableHead className="bg-white text-navy-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <TableCell key={column.key as string}>
                        {String(row[column.key])}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-skyblue-600 hover:text-skyblue-800 hover:bg-skyblue-50"
                      >
                        <Link href={`${linkPath}/${row[idField]}`}>
                          <Eye className="mr-1 h-4 w-4" /> View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;
