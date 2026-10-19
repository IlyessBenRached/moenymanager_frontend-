export interface Space {
  id: string;
  name: string;
  has_own_balance: boolean;
  balance: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface SpaceCreateInput {
  name: string;
  initial_allocation?: number;
}