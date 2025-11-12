"use client";

import { Header } from "@/components/dashboard/Header";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterStore } from "@/lib/zustand-store";
import { Search, Filter, X } from "lucide-react";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "E-commerce",
  "Education",
  "Real Estate",
  "Manufacturing",
  "Other",
];

export default function LeadsPage() {
  const {
    searchQuery,
    industryFilter,
    setSearchQuery,
    setIndustryFilter,
    resetFilters,
  } = useFilterStore();

  const hasActiveFilters = searchQuery || industryFilter !== "all";

  return (
    <div>
      <Header title="Leads Management" />
      <div className="p-6">
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Industry Filter */}
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={resetFilters}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <LeadsTable />
      </div>
    </div>
  );
}
