"use client";

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cellAction";
import { Announcement } from "@/types";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Announcement>[] = [
  {
    accessorKey: "senderName",
    header: "Sender Name",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "recipient",
    header: "Recipient",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
