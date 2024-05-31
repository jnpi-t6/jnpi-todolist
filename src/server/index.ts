import { router, publicProcedure } from "./trcp";
import { z } from "zod";
import supabase from "@/lib/supabase";

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    const { data, error } = await supabase.from("todos").select("*");
    if (error) throw new Error(error.message);
    return data;
  }),
  addTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
        userId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      console.log("Adding Todo:", input); // デバッグ用のログ
      const { data, error } = await supabase
        .from("todos")
        .insert([{ title: input.title, user_id: input.userId }]);
      if (error) {
        console.error("Supabase Error:", error); // エラーログ
        throw new Error(error.message);
      }
      console.log("Inserted Data:", data); // デバッグ用のログ
      return data;
    }),
  updateTodo: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        isCompleted: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from("todos")
        .update({
          title: input.title,
          is_completed: input.isCompleted,
        })
        .eq("id", input.id);
      if (error) throw new Error(error.message);
      return data;
    }),
  deleteTodo: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from("todos")
        .delete()
        .eq("id", input.id);
      if (error) throw new Error(error.message);
      return data;
    }),
});

export type AppRouter = typeof appRouter;
