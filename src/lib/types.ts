
import type { LucideIcon, LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// Allow LucideIcon to be a ForwardRefExoticComponent for broader compatibility
export type AppLucideIcon = LucideIcon | ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export interface DonationCategory {
  id: string;
  name: string;
  description: string;
  Icon: AppLucideIcon;
  iconColor?: string; 
  imageHint: string; 
}

export interface Donation {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: Date; 
}

export interface Member {
  id: string;
  name: string;
  email: string;
  amount: number; // Should be fixed (e.g., 1111 for SevaChampion)
  timestamp: Date;
}
