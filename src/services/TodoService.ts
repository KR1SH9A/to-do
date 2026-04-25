import { TodoRepository } from "../repositories/todoRepository";
import { Todo } from "../models/todo";

//In this service, we handle the business logic
//by reusing the repository to interact with the database

type createTodoInput = {
  name: string;
  about?: string;
  reminderTime?: number | null;
  priorityTag?: "low" | "medium" | "high";
  entitiesInvolved?: string[];
};

export class TodoService {
  private repo = new TodoRepository();

  getAllTodos(): Todo[] {
    return this.repo.getAllTodos();
  }

  getTodoByID(id: number): Todo {
    const todo = this.repo.getTodoByID(id);
    if (!todo) {
      throw new Error(`Woah! Todo with id ${id} is not found`);
    }
    return todo;
  }

  //This section creates a todo with guards and validation

  createTodo(input: createTodoInput): Todo {
    if (!input.name || input.name.trim().length === 0) {
      throw new Error("Please give a name for the todo");
    }

    const validPriorities = ["low", "medium", "high"];

    if (input.priorityTag && !validPriorities.includes(input.priorityTag)) {
      throw new Error("Give a valid priority tag between low, medium, or high");
    }

    const name = input.name.trim();

    const newTodo: Todo = {
      id: 0,
      name: input.name.trim(),
      about: input.about ?? "",
      isCompleted: 0,
      reminderTime: input.reminderTime ?? null,
      priorityTag: input.priorityTag ?? "low",
      entitiesInvolved: input.entitiesInvolved ?? [],
      createdOn: Date.now(),
    };
    return this.repo.createTodo(newTodo);
  }
}
