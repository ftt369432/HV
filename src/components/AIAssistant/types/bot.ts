import { LucideIcon } from 'lucide-react';

export interface Bot {
  name: string;
  description: string;
  icon: LucideIcon;
  provider: string;
}