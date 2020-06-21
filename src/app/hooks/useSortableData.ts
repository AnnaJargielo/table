import { data } from "../../data";
import { useState, useMemo } from "react";

export interface Item {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  postal_code: string;
  city: string;
  country: string;
  state: string;
  street_address: string;
  job_title: string;
  time_zone: string;
  ip_address: string;
}

enum Direction {
  Ascending,
  Descending,
}

export interface Sorting {
  direction: Direction;
  key: keyof Item;
}

const useSortableData = (config: Sorting | null = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === Direction.Ascending ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === Direction.Ascending ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const requestSort = (key: keyof Item) => {
    let direction = Direction.Ascending;
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === Direction.Ascending
    ) {
      direction = Direction.Descending;
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export default useSortableData;
