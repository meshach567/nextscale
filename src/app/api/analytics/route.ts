import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Get total leads
    const totalLeads = await prisma.lead.count()

    // Get leads by industry
    const leadsByIndustry = await prisma.lead.groupBy({
      by: ['industry'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    })

    // Get leads by project type
    const leadsByProjectType = await prisma.lead.groupBy({
      by: ['projectType'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    })

    // Get leads over time (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Use raw SQL to get leads over time grouped by date
    // Column names are camelCase as defined in the migration
    const leadsOverTime = await prisma.$queryRaw<Array<{
      date: Date
      count: bigint
    }>>`
      SELECT 
        DATE("createdAt") as date,
        COUNT(*)::bigint as count
      FROM "Lead"
      WHERE "createdAt" >= ${thirtyDaysAgo}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `

    // Get recent leads (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentLeads = await prisma.lead.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    })

    // Calculate growth rate
    const fourteenDaysAgo = new Date()
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)
    const previousWeekLeads = await prisma.lead.count({
      where: {
        createdAt: {
          gte: fourteenDaysAgo,
          lt: sevenDaysAgo,
        },
      },
    })

    const growthRate = previousWeekLeads > 0 
      ? ((recentLeads - previousWeekLeads) / previousWeekLeads) * 100 
      : 0

    return NextResponse.json({
      totalLeads,
      recentLeads,
      growthRate: Math.round(growthRate * 10) / 10,
      leadsByIndustry: leadsByIndustry.map(item => ({
        industry: item.industry || 'Unknown',
        count: item._count.id,
      })),
      leadsByProjectType: leadsByProjectType.map(item => ({
        projectType: item.projectType || 'Unknown',
        count: item._count.id,
      })),
      leadsOverTime: leadsOverTime.map(item => ({
        date: item.date instanceof Date 
          ? item.date.toISOString().split('T')[0]
          : new Date(item.date).toISOString().split('T')[0],
        count: Number(item.count),
      })),
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}