// ============================================
// FILE: app/admin/leads/page.tsx
// ============================================
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabaseClient';
import LeadsTable from '@/components/LeadsTable';
import AdminLogin from '@/components/AdminLogin';


async function checkAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');
  return authCookie?.value === process.env.ADMIN_PASSWORD;
}

export default async function AdminLeadsPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Fetch leads from Supabase
  const { data: leads, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Error fetching leads:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error loading leads</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Contact Leads</h1>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
            >
              Logout
            </button>
          </form>
        </div>

        <LeadsTable leads={leads || []} />
      </div>
    </div>
  );
}
