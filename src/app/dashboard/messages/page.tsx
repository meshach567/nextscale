'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Header } from '@/components/dashboard/Header'
import { useLeads } from '@/hooks/useLeads'
import { Button } from '@/components/ui/button'
import { Mail, User, Building2, Briefcase } from 'lucide-react'

export default function MessagesPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useLeads({ page, limit: 20 })

  if (isLoading) {
    return (
      <div>
        <Header title="Messages" />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Header title="Messages" />
        <div className="flex items-center justify-center h-96">
          <p className="text-red-600">Error loading messages</p>
        </div>
      </div>
    )
  }

  const { leads, pagination } = data || { leads: [], pagination: { page: 1, totalPages: 1 } }

  return (
    <div>
      <Header title="Messages" />
      <div className="p-6">
        <div className="space-y-4">
          {leads.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No messages found</p>
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                      <p className="text-sm text-gray-500">{lead.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(new Date(lead.createdAt), 'MMM dd, yyyy · h:mm a')}
                  </span>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {lead.industry && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="w-4 h-4" />
                      <span>{lead.industry}</span>
                    </div>
                  )}
                  {lead.projectType && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span>{lead.projectType}</span>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {lead.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
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
      </div>
    </div>
  )
}