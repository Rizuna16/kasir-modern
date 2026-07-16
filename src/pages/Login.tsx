import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(username, password);

    if (!success) {
      toast.error("Username atau password salah");

      return;
    }

    toast.success("Login berhasil");

    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">KASIR MODERN</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-5 text-sm text-gray-500">
          <p>Demo akun:</p>

          <p>Admin : admin / admin123</p>

          <p>Kasir : kasir / kasir123</p>
        </div>
      </div>
    </div>
  );
}
