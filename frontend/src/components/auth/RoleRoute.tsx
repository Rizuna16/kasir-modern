import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import type { UserRole } from "../../types/user";

interface Props {
  children: ReactNode;
  allowedRoles: readonly UserRole[];
}

export default function RoleRoute({ children, allowedRoles }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
}
