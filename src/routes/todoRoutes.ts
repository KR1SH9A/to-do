import { Router, Request, Response } from "express";
import { TodoService } from "../services/TodoService";

const todoRouter = Router();
const todoService = new TodoService();

//to GET all todos
todoRouter.get("/", (req: Request, res: Response) => {
  const todos = todoService.getAllTodos();
  return res.json(todos);
});

//to GET a todo by an id
todoRouter.get("/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    //handling invalid id's this time
    if (isNaN(id)) {
      return res.status(400).json({ error: "id seems to be invalid" });
    }
    const todo = todoService.getTodoByID(id);
    return res.json(todo);
  } catch (err: any) {
    return res.status(404).json({ error: err.message });
  }
});

//Create a new todo
todoRouter.post("/", (req: Request, res: Response) => {
  try {
    const todo = todoService.createTodo(req.body);
    return res.status(201).json(todo);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

//delete a todo
todoRouter.delete("/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "id seems to be invalid" });
    }
    const todo = todoService.deleteTodo(id);
    return res.status(200).json(todo);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

//Update a todo by toggling it
todoRouter.put("/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID seems to be invalid" });
    }
    const todo = todoService.toggleTodo(id);
    return res.status(200).json(todo);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default todoRouter;
