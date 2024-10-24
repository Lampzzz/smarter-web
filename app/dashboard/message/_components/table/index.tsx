"use client";

import { useEffect } from "react";

import useShelterStore from "@/store/shelterStore";
import { DataTable } from "@/components/ui/table/data-table";
import { columns } from "./columns";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import {
  useShelterTableFilters,
  CATEGORY_OPTIONS,
} from "./useShelterTableFilters";
import { ShelterFilterTypes } from "@/types";
import useAnnouncementStore from "@/store/announcementStore";

const AnnouncementTable = ({ filters }: { filters: ShelterFilterTypes }) => {
  const { fetchAnnouncements, announcements, isLoading, totalData } =
    useAnnouncementStore();

  useEffect(() => {
    fetchAnnouncements(filters);
  }, [fetchAnnouncements, filters]);

  const {
    categoryFilter,
    setCategoryFilter,
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
          searchKey="title"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="category"
          title="Category"
          options={CATEGORY_OPTIONS}
          setFilterValue={setCategoryFilter}
          filterValue={categoryFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable
        columns={columns}
        data={announcements ?? []}
        totalItems={totalData}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AnnouncementTable;
