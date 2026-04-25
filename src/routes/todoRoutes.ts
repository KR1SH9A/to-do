import { Router, Request, Response } from "express";
import { TodoService } from "../services/todoService";

const todoRouter = Router();
const todoService = new TodoService();

//to GET all todos
todoRouter.get("/", (req: Request, res: Response) => {
  const todos = todoService.getAllTodos();
  res.json(todos);
});

//to GET a todo by an id
todoRouter.get("/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const todo = todoService.getTodoByID(id);
    res.json(todo);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

//Create a new todo
todoRouter.post("/", (req: Request, res: Response) => {
  try {
    const todo = todoService.createTodo(req.body);
    res.status(201).json(todo);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default todoRouter;
