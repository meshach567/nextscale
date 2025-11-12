import { useQuery } from "@tanstack/react-query";

interface AnalyticsData {
  totalLeads: number;
  recentLeads: number;
  growthRate: number;
  leadsByIndustry: Array<{
    industry: string;
    count: number;
  }>;
  leadsByProjectType: Array<{
    projectType: string;
    count: number;
  }>;
  leadsOverTime: Array<{
    date: string;
    count: number;
  }>;
}

export function useAnalytics() {
  return useQuery<AnalyticsData>({
    queryKey: ["analytics"],
    queryFn: async () => {
      const response = await fetch("/api/analytics");
      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
