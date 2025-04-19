"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-2xl font-bold">
          Bem-vindo ao Gerenciados de usuários!
        </h1>

        <button
          onClick={() => router.push("/users")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ver usuários
        </button>
      </div>
    </ProtectedRoute>
  );
}
