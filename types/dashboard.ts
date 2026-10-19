import { Space } from "./space";
import { Commitment } from "./commitment";

export interface SpaceDashboardData {
  space: Space;
  balance: string;
  commitments: Commitment[];
  monthly_required_total: string;
}

export interface OverviewData {
  global_balance: string;
  combined_monthly_required: string;
  safe_to_spend: string;
}

export interface MonthlyRollupBreakdownItem {
  space_id: string | null;
  space_name: string;
  required: string;
  available: string;
  shortfall: boolean;
}

export interface MonthlyRollupData {
  total_required: string;
  total_available: string;
  shortfall: boolean;
  breakdown_by_space: MonthlyRollupBreakdownItem[];
}

export interface ForecastItem {
  commitment_id: string;
  space_id: string;
  due_date: string;
  amount_due: string;
}