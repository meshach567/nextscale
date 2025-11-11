// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { render } from '@react-email/render'
import nodemailer from 'nodemailer'
import ContactEmail from '@/components/emails/ContactEmail'
import { contactSchema } from '@/utils/validation'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parse = contactSchema.safeParse(body)
    if (!parse.success) {
      return NextResponse.json({ error: 'Validation error', issues: parse.error.format() }, { status: 400 })
    }

    const data = parse.data

    // Save to DB (Prisma)
    const saved = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company ?? null,
        industry: data.industry ?? null,
        projectType: data.projectType ?? null,
        message: data.message
      }
    })

    // Render email HTML using React Email component
    const html = render(<ContactEmail name={data.name} email={data.email} message={data.message} />)

    // Send email via nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: `"NextScale Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New contact from ${data.name}`,
      html
    })

    return NextResponse.json({ ok: true, id: saved.id })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

