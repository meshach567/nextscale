"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { industryIcons } from "@/components/icons/IndustryIcons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Industry } from "@/data/industries";

interface IndustryCardProps extends Industry {}

export function IndustryCard({
  title,
  slug,
  icon,
  pain,
  solution,
}: IndustryCardProps) {
  const Icon = industryIcons[icon as keyof typeof industryIcons];

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 group">
      <CardHeader className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
            <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold leading-tight pt-2">{title}</h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Pain Point:
          </p>
          <p className="text-sm leading-relaxed">{pain}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Solution:
          </p>
          <p className="text-sm leading-relaxed">{solution}</p>
        </div>
      </CardContent>

      <CardFooter>
        <Link
          href={`/contact?industry=${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          aria-label={`Talk to an expert about ${title}`}
        >
          Talk to an expert
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  );
}
