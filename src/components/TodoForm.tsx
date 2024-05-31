"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/trpc/trpc";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

type FormData = z.infer<typeof schema>;

const TodoForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();
  const addTodo = trpc.addTodo.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTodos"] });
    },
  });

  const onSubmit = (data: FormData) => {
    addTodo.mutate({ title: data.title, userId: 1 }); // 仮のuserId
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input
        {...register("title")}
        placeholder="Add new todo"
        className="input input-bordered"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <Button type="submit" className="btn btn-primary">
        Add
      </Button>
    </form>
  );
};

export default TodoForm;
