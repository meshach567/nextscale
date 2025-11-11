import { create } from 'zustand'

interface FilterState {
  searchQuery: string
  industryFilter: string
  dateRange: {
    from: Date | null
    to: Date | null
  }
  setSearchQuery: (query: string) => void
  setIndustryFilter: (industry: string) => void
  setDateRange: (from: Date | null, to: Date | null) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  industryFilter: 'all',
  dateRange: {
    from: null,
    to: null,
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIndustryFilter: (industry) => set({ industryFilter: industry }),
  setDateRange: (from, to) => set({ dateRange: { from, to } }),
  resetFilters: () => set({
    searchQuery: '',
    industryFilter: 'all',
    dateRange: { from: null, to: null },
  }),
}))

interface UIState {
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))