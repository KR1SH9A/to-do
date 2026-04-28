import React from "react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const isCompleted = todo.isCompleted === 1;

  return (
    <div className="ascii-box" style={{ opacity: isCompleted ? 0.6 : 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3>
            [{isCompleted ? "X" : " "}] {todo.name}
          </h3>
          {todo.about && (
            <p style={{ marginTop: "0.5rem", color: "var(--text-dark)", whiteSpace: "pre-wrap" }}>
              {'>'} {todo.about}
            </p>
          )}
          <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--text-dark)" }}>
            Importance: {todo.priorityTag?.toUpperCase() || "LOW"}
            {todo.entitiesInvolved && todo.entitiesInvolved.length > 0 && (
              <span style={{ marginLeft: "1rem" }}>
                With: {todo.entitiesInvolved.join(", ")}
              </span>
            )}
            <span style={{ marginLeft: "1rem" }}>
              Added: {new Date(todo.createdOn).toLocaleString()}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}>
          <button onClick={() => onToggle(todo.id)}>
            {isCompleted ? "[<] Undo" : "[V] Done"}
          </button>
          <button style={{ borderColor: "var(--error-color)", color: "var(--error-color)" }} onClick={() => onDelete(todo.id)}>
            [X] Remove
          </button>
        </div>
      </div>
    </div>
  );
};
