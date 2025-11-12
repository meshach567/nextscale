import { Header } from "@/components/dashboard/Header";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";

export default function DashboardPage() {
  return (
    <div>
      <Header title="Dashboard Overview" />
      <div className="p-6">
        <AnalyticsChart />
      </div>
    </div>
  );
}
