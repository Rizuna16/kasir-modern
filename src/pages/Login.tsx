import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button, Input } from "../components/ui";
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
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
          />

          <Button type="submit" fullWidth>
            LOGIN
          </Button>
        </form>

        <div className="mt-5 text-sm text-gray-500">
          <p className="font-medium">Demo akun:</p>

          <p>Admin : admin / admin123</p>

          <p>Kasir : kasir / kasir123</p>

          <p>Owner : owner / owner123</p>
        </div>
      </div>
    </div>
  );
}
