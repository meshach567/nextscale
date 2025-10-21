// ============================================
// FILE: app/api/submit/route.ts
// ============================================
import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/utils/validation';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { sendContactNotification } from '@/lib/resend';

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Honeypot check
    if (body.website) {
      // Silent fail for bots
      return NextResponse.json({ ok: true });
    }

    const validatedData = contactSchema.parse(body);

    // Insert into Supabase
    const { data: lead, error: dbError } = await supabaseAdmin
      .from('leads')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || null,
        industry: validatedData.industry,
        project_type: validatedData.projectType,
        message: validatedData.message,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('Supabase error:', dbError);
      throw new Error('Failed to save contact information');
    }

    // Send notification email (non-blocking)
    sendContactNotification(validatedData).catch((error) => {
      console.error('Failed to send notification email:', error);
      // Don't fail the request if email fails
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error('API error:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data', details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
