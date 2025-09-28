import { RowDataPacket } from "mysql2";

export type CorrectChoiceRow = {
  id: number;
  text: string;
} & RowDataPacket;
