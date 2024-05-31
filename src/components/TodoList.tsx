"use client";
import React from "react";
import { trpc } from "@/trpc/trpc";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";

const TodoList: React.FC = () => {
  const { data: todos, isLoading } = trpc.getTodos.useQuery();
  const queryClient = useQueryClient();
  const deleteTodo = trpc.deleteTodo.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTodos"] });
    },
  });
  const updateTodo = trpc.updateTodo.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTodos"] });
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul className="space-y-4">
      {todos?.map((todo) => (
        <li key={todo.id} className="flex items-center space-x-4">
          <span>{todo.title}</span>
          <Button
            onClick={() => deleteTodo.mutate({ id: todo.id })}
            className="btn btn-danger"
          >
            Delete
          </Button>
          <Button
            onClick={() =>
              updateTodo.mutate({ id: todo.id, title: "Updated Title" })
            }
            className="btn btn-secondary"
          >
            Edit
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
