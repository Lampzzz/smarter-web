"use client";

import { useEffect } from "react";
import useShelterStore from "@/store/shelterStore";
import { DataTable } from "@/components/ui/table/data-table";
import { columns } from "./columns";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { useShelterTableFilters, STATUS_OPTIONS } from "./table-filters";

export interface FilterTypes {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

const ShelterTable = ({ filters }: { filters: FilterTypes }) => {
  const { filteredShelters, fetchShelters, filterShelters, isLoading } =
    useShelterStore();

  useEffect(() => {
    fetchShelters();
  }, [fetchShelters]);

  useEffect(() => {
    filterShelters(filters);
  }, [filters, filterShelters]);

  const {
    statusFilter,
    setStatusFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useShelterTableFilters();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="status"
          title="Status"
          options={STATUS_OPTIONS}
          setFilterValue={setStatusFilter}
          filterValue={statusFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredShelters}
        totalItems={filteredShelters.length}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ShelterTable;