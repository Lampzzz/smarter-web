import { Shelter } from "@/types";

export const filterShelters = (
  shelters: Shelter[],
  {
    page = 1,
    limit = 10,
    status,
    search,
  }: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }
) => {
  let data = shelters || [];
  const statusArray = status ? status.split(".") : [];

  if (statusArray.length > 0) {
    data = data.filter((shelter) => statusArray.includes(shelter.status));
  }

  if (search) {
    data = data.filter((shelter) =>
      shelter.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination logic
  const offset = (page - 1) * limit;
  const paginatedShelters = data.slice(offset, offset + limit);

  return paginatedShelters;
};
