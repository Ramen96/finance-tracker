import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Home,
  Building2,
  Utensils,
  Car,
  Heart,
  Zap,
  CreditCard,
  GraduationCap,
  LineChart,
} from "lucide-react";

// ----- INCOME -----
const incomeColumns = [
  {
    key: "description" as const,
    label: "Description",
    inputType: "text",
    format: (value: string | number) => String(value),
  },
  {
    key: "amount" as const,
    label: "Cash Flow",
    inputType: "number",
    format: (value: string | number) => {
      const num = typeof value === "number" ? value : Number(value || 0);
      return `$${num.toLocaleString()}`;
    },
  },
];

export const incomeCategories = [
  { name: "Salary", icon: Briefcase, columns: incomeColumns },
  { name: "Interest", icon: DollarSign, columns: incomeColumns },
  { name: "Dividends", icon: TrendingUp, columns: incomeColumns },
  { name: "Real Estate", icon: Home, columns: incomeColumns },
  { name: "Businesses", icon: Building2, columns: incomeColumns },
];

// ----- EXPENSES -----
const expensesColumns = [
  {
    key: "description" as const,
    label: "Item",
    inputType: "text",
    format: (value: string | number) => String(value),
  },
  {
    key: "amount" as const,
    label: "Amount",
    inputType: "number",
    format: (value: string | number) => {
      const num = typeof value === "number" ? value : Number(value || 0);
      return `$${num.toLocaleString()}`;
    },
  },
];

export const expenseCategories = [
  { name: "Groceries", icon: Utensils, columns: expensesColumns },
  { name: "Housing", icon: Home, columns: expensesColumns },
  { name: "Transportation", icon: Car, columns: expensesColumns },
  { name: "Healthcare", icon: Heart, columns: expensesColumns },
  { name: "Utilities", icon: Zap, columns: expensesColumns },
];

// ----- ASSETS -----
const producingAssetsColumns = [
  { key: "name" as const, label: "Asset", inputType: "text", format: (value: string | number) => String(value) },
  { key: "qty" as const, label: "Qty", inputType: "number", format: (value: string | number) => String(value) },
  { key: "value" as const, label: "Value", inputType: null, format: (value: string | number) => String(value) },
  { key: "incomeOrRate" as const, label: "Rate", inputType: null, format: (value: string | number) => String(value) },
];

const growthAssetsColumns = [
  { key: "name" as const, label: "Asset", inputType: "text", format: (value: string | number) => String(value) },
  { key: "value" as const, label: "Value", inputType: "number", format: (value: string | number) => String(value) },
  { key: "incomeOrRate" as const, label: "Rate", inputType: null, format: (value: string | number) => String(value) },
];

export const assetCategories = [
  { name: "Producing Assets", icon: TrendingUp, columns: producingAssetsColumns },
  { name: "Growth Assets", icon: LineChart, columns: growthAssetsColumns },
];

// ----- LIABILITIES -----
const liabilitiesColumns = [
  {
    key: "name" as const,
    label: "Name",
    inputType: "text",
    format: (value: string | number) => String(value),
  },
  {
    key: "balance" as const,
    label: "Balance",
    inputType: null,
    format: (value: string | number) => {
      const num = typeof value === "number" ? value : Number(value || 0);
      return `$${num.toLocaleString()}`;
    },
  },
  {
    key: "payment" as const,
    label: "Payment",
    inputType: "number",
    format: (value: string | number) => {
      const num = typeof value === "number" ? value : Number(value || 0);
      return `$${num.toLocaleString()}`;
    },
  },
  {
    key: "rate" as const,
    label: "Rate",
    inputType: "number",
    format: (value: string | number) => {
      const num = typeof value === "number" ? value : Number(value || 0);
      return `${num}%`;
    },
  },
];

export const liabilityCategories = [
  { name: "Credit Cards", icon: CreditCard, columns: liabilitiesColumns },
  { name: "Auto Loans", icon: Car, columns: liabilitiesColumns },
  { name: "Student Loans", icon: GraduationCap, columns: liabilitiesColumns },
  { name: "Real Estate", icon: Home, columns: liabilitiesColumns },
  { name: "Business Loans", icon: Building2, columns: liabilitiesColumns },
];
