"use client";

import { useUser, RedirectToSignIn } from "@clerk/nextjs";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    // Redirige al login si no estás autenticado
    return <RedirectToSignIn />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Bienvenido, {user?.firstName}</h1>
      <p>Esta es tu área privada.</p>
    </div>
  );
}
