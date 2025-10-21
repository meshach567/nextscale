// ============================================
// FILE: app/api/admin/logout/route.ts
// ============================================
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  redirect('/admin/leads');
}