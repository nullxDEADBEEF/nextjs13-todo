import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "./components/TodoItem.tsx";

const getTodos = () => {
  return prisma.todo.findMany();
};

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="py-1 px-2 rounded border outline-none border-slate-300 text-slate-300 focus-within:bg-slate-700 hover:bg-slate-700"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
