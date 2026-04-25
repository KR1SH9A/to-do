import express from "express";
import todoRoutes from "./routes/todoRoutes";

const todoApp = express();
todoApp.use(express.json());

todoApp.use("/todo", todoRoutes);

todoApp.listen(3000, () => {
  console.log("Todo App is running on port 3000 -> http://localhost:3000/todo");
});
