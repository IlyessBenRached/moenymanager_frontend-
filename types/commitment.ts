export type CommitmentStatus = "on_track" | "behind" | "at_risk" | "completed";
export type CommitmentKind = "bill" | "objective";
export type Recurrence = "one_time" | "monthly" | "quarterly" | "yearly";

export interface Commitment {
  id: string;
  space_id: string;
  kind: CommitmentKind;
  recurrence: Recurrence;
  target_amount: string;
  target_date: string;
  amount_saved_so_far: string;
  required_monthly_contribution: string;
  status: CommitmentStatus;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}