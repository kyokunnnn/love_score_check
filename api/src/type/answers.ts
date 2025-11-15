type AnswerResponse = {
    id: number;
    quiz_id: number;
    text: string;
    category: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };