import todoDatabase from "../database/database";
//imported the singleton class instance of todoDatabase

import { Todo } from "../models/todo";
//importted the model for todo for use in the repository

export class TodoRepository {
  private db = todoDatabase.getInstance();
  //we are using the singleton database instance here

  //now for the CRUD operations for the todo's

  getAllTodos(): Todo[] {
    const rows = this.db.prepare("SELECT * FROM todoKrishna").all() as any[];
    return rows.map((row) => ({
      ...row,
      entitiesInvolved: row.entitiesInvolved
        ? JSON.parse(row.entitiesInvolved)
        : [],
    }));
  }

  getTodoByID(id: number): Todo | undefined {
    const row = this.db
      .prepare("SELECT * FROM todoKrishna WHERE id = ?")
      .get(id) as any;

    if (!row) return undefined;

    return {
      ...row,
      entitiesInvolved: row.entitiesInvolved
        ? JSON.parse(row.entitiesInvolved)
        : [],
    };
  } //have to make it hydrate the entitiesInvolved JSON (update- done)

  createTodo(todo: Todo): Todo {
    const result = this.db
      .prepare(
        "INSERT INTO todoKrishna (name, isCompleted, createdOn, about, reminderTime, priorityTag, entitiesInvolved) VALUES (?, ?, ?, ?, ?, ?, ?)",
      )
      .run(
        todo.name,
        todo.isCompleted,
        todo.createdOn,
        todo.about,
        todo.reminderTime,
        todo.priorityTag,
        JSON.stringify(todo.entitiesInvolved ?? []), //arrays were not supported so opted for Stringify
      );
    return {
      ...todo,
      id: result.lastInsertRowid as number,
    };
  }

  deleteTodo(id: number): void {
    const deleteResult = this.db
      .prepare("DELETE FROM todoKrishna WHERE id = ?")
      .run(id);
    if (deleteResult.changes === 0) {
      throw new Error("Can't find that todo to delete!");
    }
  }

  toggleCompletedTodo(id: number): void {
    this.db
      .prepare(
        "UPDATE todoKrishna SET isCompleted = NOT isCompleted WHERE id =?",
      )
      .run(id);
  }
}

//for SRP this file only handles and defines the CRUD's for each todo
