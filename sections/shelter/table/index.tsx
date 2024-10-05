"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { columns } from "./columns";
import { Shelter } from "@/types";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import {
  useShelterTableFilters,
  STATUS_OPTIONS,
} from "./use-shelter-table-filters";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";

const ShelterTable = ({
  data,
  totalData,
}: {
  data: Shelter[];
  totalData: number;
}) => {
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
    <div className="space-y-4 ">
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
        {/* <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        /> */}
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
};

export default ShelterTable;
