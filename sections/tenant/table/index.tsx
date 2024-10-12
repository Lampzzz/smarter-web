"use client";

import { useEffect } from "react";

import useUserstore from "@/store/userStore";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { GENDER_OPTIONS, useUserTableFilters } from "./table-filters";
import { columns } from "./columns";
import { UserFilterTypes } from "@/types";

export default function UserTable({ filters }: { filters: UserFilterTypes }) {
  const { fetchUsers, filteredUsers, filterUsers, isLoading } = useUserstore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    filterUsers(filters);
  }, [filters, filterUsers]);

  const {
    genderFilter,
    setGenderFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useUserTableFilters();

  console.log(filters);

  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="gender"
          title="Gender"
          options={GENDER_OPTIONS}
          setFilterValue={setGenderFilter}
          filterValue={genderFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredUsers}
        totalItems={filteredUsers.length}
        isLoading={isLoading}
      />
    </div>
  );
}
