export type QuestionWithChoices = {
  questionId: number;
  questionText: string;
  choices: {
    id: number;
    text: string;
    isCorrect: boolean;
  }[];
};

export type Choice = {
  id: number;
  text: string;
  isCorrect: boolean;
};
