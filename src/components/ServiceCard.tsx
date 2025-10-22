import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  desc: string;
  href: string;
}

export default function ServiceCard({ title, desc, href }: ServiceCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{desc}</p>
        </CardContent>
        <CardFooter>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
            Learn more about {title}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
