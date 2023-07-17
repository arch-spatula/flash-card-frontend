/// <reference types="vite/client" />

declare type Card = {
  _id?: string;
  userId?: string;
  question: string;
  answer: string;
  stackCount: number;
  submitDate: Date;
};
