import { LucideIcon } from 'lucide-react';
import { 
  Fuel as OilBarrel, 
  Landmark, 
  Building2, 
  Sprout, 
  Radio, 
  Music 
} from 'lucide-react';

export const industryIcons: Record<string, LucideIcon> = {
  OilBarrel,
  Landmark,
  Building2,
  Sprout,
  Radio,
  Music,
};

export type IndustryIconName = keyof typeof industryIcons;