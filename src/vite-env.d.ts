/// <reference types="vite/client" />

declare type Card = {
  _id?: string;
  userId?: string;
  question: string;
  answer: string;
  stackCount: number;
  submitDate: Date;
};

declare type ErrorResponse = { success: boolean; msg: string };

declare type resetErrorBoundary = (...args: any[]) => void;
