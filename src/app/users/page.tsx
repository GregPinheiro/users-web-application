"use client";

import { useState } from "react";
import { IUser } from "@/interfaces";

import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getUsers, deleteUser } from "@/services/users-service";

import { CreateUserModal } from "@/components/CreateUserModal";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { EditUserModal } from "@/components/EditUserModal";
import { ConfirmModal } from "@/components/ConfirmModal";
import { queryClient } from "@/libs/react-query-client";
export default function UsersPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const handleDelete = async (): Promise<void> => {
    try {
      if (!userToDelete) return;

      await deleteUser(userToDelete.id);

      await queryClient.invalidateQueries({ queryKey: ["users"] });

      setUserToDelete(null);
      setShowModal(false);
    } catch (err: any) {
      toast.error(err.message || "Erro inesperado");
    }
  };

  const handleEdit = (user: IUser) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const confirmDelete = (user: IUser) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const cancelDelete = (): void => {
    setUserToDelete(null);
    setShowModal(false);
  };

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error instanceof Error) return <p>Erro: {error.message}</p>;

  return (
    <ProtectedRoute>
      <main className="p-8 flex flex-col items-center">
        <div className="flex justify-between w-[80%] m-4">
          <h1 className="text-3xl font-bold">Lista de Usuários</h1>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Novo Usuário
          </button>
        </div>

        <ConfirmModal
          isOpen={showModal}
          title="Confirmar exclusão"
          message={`Tem certeza que deseja excluir o usuário "${userToDelete?.name}"?`}
          onCancel={cancelDelete}
          onConfirm={handleDelete}
        />

        <CreateUserModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
          }}
        />

        <EditUserModal
          isOpen={showEditModal}
          user={userToEdit!}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            queryClient.refetchQueries({ queryKey: ["users"] });
          }}
        />

        <div className="w-[80%]">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded shadow">
              <thead>
                <tr className="bg-gray-400">
                  <th className="py-3 px-6 text-left font-semibold text-gray-800">
                    Nome
                  </th>
                  <th className="py-3 px-6 text-left font-semibold text-gray-800">
                    Email
                  </th>
                  <th className="py-3 px-6 text-left font-semibold text-gray-800">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-300">
                {users?.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-6 text-black">{user.name}</td>
                    <td className="py-3 px-6 text-black">{user.email}</td>
                    <td className="py-3 px-6 flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => confirmDelete(user)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
