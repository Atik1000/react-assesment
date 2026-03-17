"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductFilterState {
  searchTerm: string;
  selectedCategory: string;
  currentPage: number;
  pageSize: number;
  setSearchTerm: (searchTerm: string) => void;
  setSelectedCategory: (selectedCategory: string) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  hydrateFilters: (filters: {
    searchTerm?: string;
    selectedCategory?: string;
    currentPage?: number;
    pageSize?: number;
  }) => void;
}

export const useProductsFilterStore = create<ProductFilterState>()(
  persist(
    (set) => ({
      searchTerm: "",
      selectedCategory: "",
      currentPage: 1,
      pageSize: 10,
      setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }),
      setSelectedCategory: (selectedCategory) =>
        set({ selectedCategory, currentPage: 1 }),
      setCurrentPage: (currentPage) => set({ currentPage }),
      setPageSize: (pageSize) => set({ pageSize, currentPage: 1 }),
      hydrateFilters: (filters) =>
        set((state) => ({
          searchTerm: filters.searchTerm ?? state.searchTerm,
          selectedCategory: filters.selectedCategory ?? state.selectedCategory,
          currentPage: filters.currentPage ?? state.currentPage,
          pageSize: filters.pageSize ?? state.pageSize,
        })),
    }),
    {
      name: "products-filters-v1",
      partialize: (state) => ({
        searchTerm: state.searchTerm,
        selectedCategory: state.selectedCategory,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
      }),
    }
  )
);
