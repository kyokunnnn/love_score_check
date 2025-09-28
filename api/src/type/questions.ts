import { RowDataPacket } from "mysql2";

export type QuizChoiceRow = {
  question_id: number;
  question_text: string;
  choice_id: number;
  choice_text: string;
  is_correct: boolean;
} & RowDataPacket;
