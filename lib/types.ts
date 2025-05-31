export interface DbUser {
  id: string;
  email: string;
  created_at: Date;
}

export interface CVReview {
  id: number;
  user_id: string;
  file_name: string | null;
  owner_name: string | null;
  analysis_text: string;
  score: number;
  created_at: Date;
  updated_at: Date;
}
