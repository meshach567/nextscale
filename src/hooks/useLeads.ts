import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Lead {
  id: string
  name: string
  email: string
  industry: string | null
  projectType: string | null
  message: string
  createdAt: Date
}

interface LeadsResponse {
  leads: Lead[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface UseLeadsParams {
  search?: string
  industry?: string
  from?: Date | null
  to?: Date | null
  page?: number
  limit?: number
}

export function useLeads(params: UseLeadsParams = {}) {
  const { search = '', industry = 'all', from, to, page = 1, limit = 10 } = params

  return useQuery<LeadsResponse>({
    queryKey: ['leads', { search, industry, from, to, page, limit }],
    queryFn: async () => {
      const searchParams = new URLSearchParams()
      if (search) searchParams.set('search', search)
      if (industry) searchParams.set('industry', industry)
      if (from) searchParams.set('from', from.toISOString())
      if (to) searchParams.set('to', to.toISOString())
      searchParams.set('page', page.toString())
      searchParams.set('limit', limit.toString())

      const response = await fetch(`/api/leads?${searchParams}`)
      if (!response.ok) {
        throw new Error('Failed to fetch leads')
      }
      return response.json()
    },
  })
}

export function useDeleteLead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/leads?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete lead')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
      queryClient.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}