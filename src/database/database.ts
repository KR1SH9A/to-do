import Database from "better-sqlite3";

// a static instance and private constructor to maintain a singleton design
// pattern, so database connection is reused across the application.

class todoDatabase {
  private static instance: Database.Database;
  private constructor() {}

  static getInstance(): Database.Database {
    if (!todoDatabase.instance) {
      todoDatabase.instance = new Database("todo.db");

      //initializing schema for db here

      todoDatabase.instance
        .prepare(
          `
      CREATE TABLE IF NOT EXISTS todoKrishna(
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        isCompleted INTEGER DEFAULT FALSE,

        createdOn DATETIME DEFAULT CURRENT_TIMESTAMP,

        about TEXT,

        reminderTime DATETIME,

        priorityTag TEXT,

        entitiesInvolved TEXT
      )
  `,
        )
        .run();
    }
    return todoDatabase.instance;
  }
}

export default todoDatabase;

//For SRP, this file only handles db conn and the schema intitialization for it.
