export type IncomeSourceType = "space" | "external";

export interface IncomeEntry {
  id: string;
  amount: string;
  date: string;
  source_type: IncomeSourceType;
  source_ref: string;
  created_at: string;
}

export interface IncomeCreateInput {
  amount: number;
  date: string;
  source_type: IncomeSourceType;
  source_ref: string;
}

export interface IncomeBreakdownItem {
  source_ref: string;
  total: string;
}