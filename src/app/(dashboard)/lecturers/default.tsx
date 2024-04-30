"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DataGridTable from "@/components/ui/DataGridTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { students } from "@/lib/static_data";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import React, { useMemo } from "react";
import { DataTable } from "../../../components/ui/dataTable";
import { Student } from "../students/default";
import Card from "./Card";

const data: Student[] = students;

function DefaultPage() {
  const columns: ColumnDef<Student>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="grid place-items-center w-[3rem] pr-4">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value: boolean) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="grid place-items-center w-[2rem]">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="w-full"
            >
              Staff ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="capitalize text-center !text-dark-blue">
            {row.getValue("id")}
          </div>
        ),
      },
      {
        accessorKey: "first_name",
        header: "First Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("first_name")}</div>
        ),
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("last_name")}</div>
        ),
      },
      {
        accessorKey: "faculty",
        header: "Faculty",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("faculty")}</div>
        ),
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("department")}</div>
        ),
      },
      {
        accessorKey: "level",
        header: "Level",
        cell: ({ row }) => (
          <div className="border w-fit border-umber rounded-[0.25rem] px-2 py-1 text-xs text-umber">
            {row.getValue("level")} Level
          </div>
        ),
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => (
          <div className="capitalize w-fit border border-main-blue rounded-[0.25rem] px-2 py-1 text-xs text-main-blue">
            {row.getValue("gender")}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Action",
        enableHiding: false,
        cell: ({ row }) => {
          const lecturer = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Action</DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="px-4 lg:px-[3.5rem] pt-8">
      <DataGridTable
        data={students}
        renderGrid={(item, index) => (
          <Card key={index} className="cursor-pointer" {...item} />
        )}
        searchLabel="Search Lecturers"
      >
        <DataTable data={data} columns={columns} />
      </DataGridTable>
    </div>
  );
}

export default DefaultPage;
