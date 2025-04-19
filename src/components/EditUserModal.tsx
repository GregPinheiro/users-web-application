import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateUser } from "@/services/users-service";
import { IUser } from "@/interfaces";

interface Props {
  isOpen: boolean;
  user: IUser | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditUserModal({ isOpen, user, onClose, onSuccess }: Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      await updateUser({ id: user!.id, name, email });

      onSuccess();
      onClose();
      setName("");
      setEmail("");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || "Não foi possível atualizar o usuário");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[50%]">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Editar Usuário</h2>

        {error && <p className="text-red-600">{error}</p>}

        <input
          type="text"
          placeholder="Nome"
          className="w-full mb-4 px-4 py-2 border rounded text-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded text-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500 text-white"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
