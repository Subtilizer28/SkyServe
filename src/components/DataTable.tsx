/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Column<T extends object> {
  key: keyof T;
  title: string;
}

interface DataTableProps<T extends object> {
  title: string;
  columns: Column<T>[];
  data: T[];
  linkPath: string;
  tableName: string;
  idField?: keyof T;
}

const handleDelete = async (
  row: string,
  tableName: string,
  refresh?: () => void, // optional callback to refresh table data
) => {
  if (!row) {
    console.error("Row ID is missing.");
    return;
  }

  try {
    const res = await axios.post("/api/delete", {
      id: row,
      table: tableName,
    });

    if (res.status === 200) {
      console.log("Deleted successfully");
      refresh?.(); // Call refresh if provided
    } else {
      console.error("Failed to delete:");
    }
  } catch (error) {
    console.error("Error deleting row:", error);
  }
};

const DataTable = <T extends object>({
  title,
  columns,
  data,
  linkPath,
  tableName,
  idField = "id" as keyof T,
}: DataTableProps<T>) => {
  const router = useRouter();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [editRow, setEditRow] = useState<Partial<T> | null>(null);

  const handleOpenUpdateModal = (row: T) => {
    setEditRow({ ...row });
    setOpenUpdateModal(true);
  };

  const handleUpdateChange = (field: keyof T, value: string) => {
    if (!editRow) return;
    setEditRow({ ...editRow, [field]: value });
  };

  const handleSubmitUpdate = async () => {
    if (!editRow || !editRow[idField]) return;

    try {
      await axios.post("/api/update", {
        id: String(editRow[idField]),
        table: tableName,
        values: editRow,
      });
      setOpenUpdateModal(false);
      router.refresh();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <>
      <Card className="shadow-md">
        <CardHeader className="bg-skyblue-50">
          <CardTitle className="text-navy-800">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead
                      key={column.key as string}
                      className="bg-white text-navy-700"
                    >
                      {column.title}
                    </TableHead>
                  ))}
                  <TableHead className="bg-white text-navy-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      className="py-8 text-center text-muted-foreground"
                    >
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => handleOpenUpdateModal(row)}
                              className="cursor-pointer"
                            >
                              <Pencil className="mr-2 h-4 w-4" /> Update
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleDelete(
                                  String(row[idField]),
                                  tableName,
                                  () => router.refresh(),
                                )
                              }
                              className="cursor-pointer text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`${linkPath}/${row[idField]}`)
                              }
                              className="cursor-pointer text-blue-600"
                            >
                              <Eye className="mr-1 h-4 w-4" /> View
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Dialog open={openUpdateModal} onOpenChange={setOpenUpdateModal}>
  <DialogContent className="space-y-4">
    <DialogTitle className="text-lg text-navy-800">Update Entry</DialogTitle>

    {editRow &&
      columns.map((column) => (
        <div key={String(column.key)} className="space-y-1">
          <label className="block text-sm text-navy-600">{column.title}</label>
          <Input
            value={String(editRow[column.key] ?? "")}
            onChange={(e) => handleUpdateChange(column.key, e.target.value)}
          />
        </div>
      ))}

    <div className="flex justify-end gap-2 pt-4">
      <Button variant="outline" onClick={() => setOpenUpdateModal(false)}>
        Cancel
      </Button>
      <Button onClick={handleSubmitUpdate}>Submit</Button>
    </div>
  </DialogContent>
</Dialog>
    </>
  );
};

export default DataTable;
