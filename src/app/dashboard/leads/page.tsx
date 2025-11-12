'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { LeadsTable } from '@/components/dashboard/LeadsTable'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFilterStore } from '@/lib/zustand-store'
import { Search, Filter, X, Calendar, Download, RefreshCw } from 'lucide-react'
import { useLeads } from '@/hooks/useLeads'

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'E-commerce',
  'Education',
  'Real Estate',
  'Manufacturing',
  'Other',
]

const projectTypes = [
  'Web Development',
  'Mobile App',
  'Dashboard',
  'E-commerce',
  'Learning Platform',
  'Custom Software',
  'Consulting',
  'Other',
]

export default function LeadsPage() {
  const { 
    searchQuery, 
    industryFilter,
    dateRange,
    setSearchQuery, 
    setIndustryFilter,
    setDateRange,
    resetFilters 
  } = useFilterStore()

  const [projectTypeFilter, setProjectTypeFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Fetch leads with current filters
  const { data, isLoading, refetch } = useLeads({
    search: searchQuery,
    industry: industryFilter === 'all' ? undefined : industryFilter,
    from: dateRange.from,
    to: dateRange.to,
    page,
    limit: 10,
  })

  const hasActiveFilters = searchQuery || industryFilter !== 'all' || projectTypeFilter !== 'all' || dateRange.from || dateRange.to

  const handleExportCSV = () => {
    if (!data?.leads || data.leads.length === 0) {
      alert('No data to export')
      return
    }

    // Prepare CSV data
    const headers = ['Name', 'Email', 'Industry', 'Project Type', 'Message', 'Date']
    const rows = data.leads.map(lead => [
      lead.name,
      lead.email,
      lead.industry || 'N/A',
      lead.projectType || 'N/A',
      `"${lead.message.replace(/"/g, '""')}"`, // Escape quotes in message
      new Date(lead.createdAt).toLocaleString(),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `leads-export-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleResetAllFilters = () => {
    resetFilters()
    setProjectTypeFilter('all')
    setPage(1)
  }

  const totalLeads = data?.pagination.total || 0
  const filteredLeads = data?.leads.length || 0

  return (
    <div>
      <Header title="Leads Management" />
      <div className="p-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Total Leads</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalLeads}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Showing</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{filteredLeads}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Current Page</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{page}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Total Pages</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{data?.pagination.totalPages || 0}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Actions
            </h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="gap-2"
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="gap-2"
                disabled={!data?.leads || data.leads.length === 0}
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Row 1: Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or message content..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setPage(1) // Reset to first page on search
                }}
                className="pl-10"
              />
            </div>

            {/* Row 2: Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Industry Filter */}
              <div>
                <label htmlFor="industry-select" className="text-sm font-medium text-gray-700 mb-2 block">
                  Industry
                </label>
                <Select 
                  value={industryFilter} 
                  onValueChange={(value) => {
                    setIndustryFilter(value)
                    setPage(1)
                  }}
                >
                  <SelectTrigger id="industry-select">
                    <SelectValue placeholder="All Industries" />
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
              </div>

              {/* Project Type Filter */}
              <div>
                <label htmlFor="projectType-select" className="text-sm font-medium text-gray-700 mb-2 block">
                  Project Type
                </label>
                <Select 
                  value={projectTypeFilter} 
                  onValueChange={(value) => {
                    setProjectTypeFilter(value)
                    setPage(1)
                  }}
                >
                  <SelectTrigger id="projectType-select">
                    <SelectValue placeholder="All Project Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Project Types</SelectItem>
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div>
                <label htmlFor="from-date" className="text-sm font-medium text-gray-700 mb-2 block">
                  Date Range
                </label>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <Calendar className="w-4 h-4" />
                  {dateRange.from && dateRange.to
                    ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                    : 'Select date range'}
                </Button>
              </div>
            </div>

            {/* Date Picker */}
            {showDatePicker && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="from-date" className="text-sm font-medium text-gray-700 mb-2 block">
                      From Date
                    </label>
                    <Input
                      id="from-date"
                      type="date"
                      value={dateRange.from?.toISOString().split('T')[0] || ''}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null
                        setDateRange(date, dateRange.to)
                        setPage(1)
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="to-date" className="text-sm font-medium text-gray-700 mb-2 block">
                      To Date
                    </label>
                    <Input
                      id="to-date"
                      type="date"
                      value={dateRange.to?.toISOString().split('T')[0] || ''}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null
                        setDateRange(dateRange.from, date)
                        setPage(1)
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters & Reset */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      Search: "{searchQuery}"
                    </span>
                  )}
                  {industryFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      Industry: {industryFilter}
                    </span>
                  )}
                  {projectTypeFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Project: {projectTypeFilter}
                    </span>
                  )}
                  {(dateRange.from || dateRange.to) && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                      Date Range Active
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  onClick={handleResetAllFilters}
                  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <LeadsTable />
      </div>
    </div>
  )
}