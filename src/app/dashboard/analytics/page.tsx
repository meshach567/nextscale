import { Header } from '@/components/dashboard/Header'
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart'

export default function AnalyticsPage() {
  return (
    <div>
      <Header title="Analytics & Insights" />
      <div className="p-6">
        <AnalyticsChart />
      </div>
    </div>
  )
}