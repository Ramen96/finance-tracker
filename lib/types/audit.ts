import { LucideIcon } from "lucide-react";

export type LineItem = {
  icon: LucideIcon;
  label: string;
  amount: number;
}

export type AuditData = {
  tag: string;
  items: LineItem[];
}
