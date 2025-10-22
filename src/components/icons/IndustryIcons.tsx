import {
  Building2,
  Landmark,
  type LucideIcon,
  Music,
  Fuel as OilBarrel,
  Radio,
  Sprout,
} from "lucide-react";

export const industryIcons: Record<string, LucideIcon> = {
  OilBarrel,
  Landmark,
  Building2,
  Sprout,
  Radio,
  Music,
};

export type IndustryIconName = keyof typeof industryIcons;
