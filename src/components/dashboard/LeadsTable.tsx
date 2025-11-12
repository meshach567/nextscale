"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Trash2, Eye } from "lucide-react";
import { useLeads, useDeleteLead } from "@/hooks/useLeads";
import { useFilterStore } from "@/lib/zustand-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Lead {
  id: string;
  name: string;
  email: string;
  industry: string | null;
  projectType: string | null;
  message: string;
  createdAt: Date;
}

export function LeadsTable() {
  const { searchQuery, industryFilter, dateRange } = useFilterStore();
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const { data, isLoading, error } = useLeads({
    search: searchQuery,
    industry: industryFilter,
    from: dateRange.from,
    to: dateRange.to,
    page,
    limit: 10,
  });

  const deleteMutation = useDeleteLead();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-600">Error loading leads</p>
      </div>
    );
  }

  const { leads, pagination } = data || {
    leads: [],
    pagination: { page: 1, totalPages: 1 },
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Project Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No leads found
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {lead.industry || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>{lead.projectType || "N/A"}</TableCell>
                  <TableCell className="text-gray-500">
                    {format(new Date(lead.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(lead.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Lead Details Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Name</p>
                <p className="mt-1">{selectedLead.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="mt-1">{selectedLead.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Industry</p>
                <p className="mt-1">{selectedLead.industry || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Project Type
                </p>
                <p className="mt-1">{selectedLead.projectType || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Message</p>
                <p className="mt-1 text-sm text-gray-600">
                  {selectedLead.message}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Date</p>
                <p className="mt-1">
                  {format(new Date(selectedLead.createdAt), "PPpp")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
