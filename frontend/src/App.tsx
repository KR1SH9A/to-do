import React, { useEffect, useState } from "react";
import { getTodos, createTodo, toggleTodo, deleteTodo } from "./api/todoApi";
import type { Todo, CreateTodoInput } from "./types/todo";
import { TodoItem } from "./components/TodoItem";

const ASCII_ART = `
  _______  _______  ______   _______    _______  _______  _______ 
 |       ||       ||      | |       |  |   _   ||       ||       |
 |_     _||   _   ||  _    ||   _   |  |  |_|  ||    _  ||    _  |
   |   |  |  | |  || | |   ||  | |  |  |       ||   |_| ||   |_| |
   |   |  |  |_|  || |_|   ||  |_|  |  |       ||    ___||    ___|
   |   |  |       ||       ||       |  |   _   ||   |    |   |    
   |___|  |_______||______| |_______|  |__| |__||___|    |___|    
`;

const CatAnimation = () => {
  const [frame, setFrame] = useState(0);
  const frames = [
    " /\\_/\\ \n( o.o )\n > ^ < ",
    " /\\_/\\ \n( -.- )\n > ^ < ",
    " /\\_/\\ \n( ^.^ )\n > ^ < ",
  ];
  useEffect(() => {
    const timer = setInterval(() => setFrame((f) => (f + 1) % frames.length), 600);
    return () => clearInterval(timer);
  }, []);
  return (
    <pre style={{ position: "absolute", bottom: "1rem", right: "1rem", margin: 0, lineHeight: 1.2, color: "var(--text-dark)", fontSize: "0.8rem", pointerEvents: "none" }}>
      {frames[frame]}
    </pre>
  );
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [priorityTag, setPriorityTag] = useState<"low" | "medium" | "high">("low");
  const [entities, setEntities] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const input: CreateTodoInput = {
        name: name.trim(),
        about: about.trim() || undefined,
        priorityTag,
        entitiesInvolved: entities.split(",").map(e => e.trim()).filter(e => e),
      };
      await createTodo(input);
      setName("");
      setAbout("");
      setEntities("");
      setPriorityTag("low");
      fetchTodos();
    } catch (err: any) {
      setError(err.message || "Error creating todo");
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleTodo(id);
      fetchTodos();
    } catch (err: any) {
      setError(err.message || "Error toggling todo");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (err: any) {
      setError(err.message || "Error deleting todo");
    }
  };

  return (
    <div style={{ maxWidth: "800px", width: "100%", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button 
          onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
          style={{ 
            fontSize: "1.2rem", 
            padding: "0.2rem 0.6rem", 
            border: "1px dashed var(--text-color)",
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
            cursor: "pointer"
          }}
          title="Toggle Theme"
        >
          {theme === "dark" ? "[SUN]" : "[MOON]"}
        </button>
      </div>
      <div className="title-art">{ASCII_ART}</div>
      <p style={{ textAlign: "center", marginBottom: "2rem" }}>
        Ready to achieve your goals! <span className="blink">_</span>
      </p>

      {error && (
        <div className="ascii-box" style={{ borderColor: "var(--error-color)", color: "var(--error-color)" }}>
          Oops: {error}
        </div>
      )}

      <form className="ascii-box" onSubmit={handleCreate}>
        <div style={{ marginBottom: "1rem" }}>
          <label>What do you want to achieve?</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="E.g., Read a book..." 
            autoFocus 
          />
        </div>
        
        <div style={{ marginBottom: "1rem" }}>
          <label>Add some details (Optional):</label>
          <textarea 
            value={about} 
            onChange={e => setAbout(e.target.value)} 
            placeholder="How are you going to do it?"
            rows={3}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label>How important is this?</label>
            <select value={priorityTag} onChange={e => setPriorityTag(e.target.value as any)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div style={{ flex: 2 }}>
            <label>Who's joining you? (Comma separated):</label>
            <input 
              type="text" 
              value={entities} 
              onChange={e => setEntities(e.target.value)} 
              placeholder="e.g. Alice, Bob" 
            />
          </div>
        </div>

        <button type="submit" style={{ width: "100%", padding: "1rem" }}>[+] Add Goal [+]</button>
        <CatAnimation />
      </form>

      <div style={{ marginTop: "2rem" }}>
        <h2>{'>'} Your Goals [{todos.length}]</h2>
        <div style={{ borderBottom: "1px dashed var(--text-color)", marginBottom: "1rem" }}></div>
        
        {loading ? (
          <p>Loading your goals<span className="blink">...</span></p>
        ) : todos.length === 0 ? (
          <p style={{ color: "var(--text-dark)" }}>No goals yet. Let's create one!</p>
        ) : (
          todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={handleToggle} 
              onDelete={handleDelete} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
