import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isLogin } = useAuth();

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
