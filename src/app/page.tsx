import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <>
      <div className="container mx-auto  max-w-4xl p-4">
        <h1 className="mb-4 text-2xl font-bold">ToDo App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </>
  );
}
