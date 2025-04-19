"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getToken } from "@/services/users-service";
import AxiosHelper from "@/helpers/axios-helper";
export default function Login() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      const { access_token } = await getToken(username);

      if (!access_token) throw new Error("Erro ao obter token");

      setToken(access_token);

      AxiosHelper.setToken(access_token);

      router.push("/");
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center text-black">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              username
            </label>
            <input
              type="text"
              className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 text-gray-900"
              placeholder="nome do usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
