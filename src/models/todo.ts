// this file defines the todo interface for the todo model
// with its properties and types

export interface Todo {
  id: number;
  name: string;
  isCompleted: number;
  createdOn: number;
  about?: string;
  reminderTime?: number | null;
  priorityTag?: "low" | "medium" | "high";
  entitiesInvolved: string[];
}

// for SRP, it only serves as the model for all todo's and DB decoupling
