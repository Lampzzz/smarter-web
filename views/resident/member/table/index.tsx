"use client";

import { useEffect } from "react";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { GENDER_OPTIONS, useUserTableFilters } from "./table-filters";
import { columns } from "./columns";
import { UserFilterTypes } from "@/types";
import useMemberStore from "@/store/memberStore";

export default function MemberTable({ filters }: { filters: UserFilterTypes }) {
  const { fetchMembers, members, isLoading } = useMemberStore();

  useEffect(() => {
    fetchMembers(filters);
  }, [filters, fetchMembers]);

  const {
    genderFilter,
    setGenderFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useUserTableFilters();

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
        data={members!}
        totalItems={members?.length ?? 0}
        isLoading={isLoading}
      />
    </div>
  );
}
