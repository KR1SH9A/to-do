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

export interface CreateTodoInput {
  name: string;
  about?: string;
  reminderTime?: number | null;
  priorityTag?: "low" | "medium" | "high";
  entitiesInvolved?: string[];
}
