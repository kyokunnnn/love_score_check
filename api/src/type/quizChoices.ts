export type CorrectChoiceRow = {
  id: number;
  text: string;
};

export type QuizChoiceRow = {
  id: number;
  quiz_id: number;
  choice_text: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
