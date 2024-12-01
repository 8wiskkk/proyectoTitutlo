"use client"; // Indica que este archivo es un componente cliente

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/clerk-test");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username || user.first_name || "Usuario sin nombre"} -{" "}
            {user.email_addresses[0]?.email_address}
          </li>
        ))}
      </ul>
    </div>
  );
}
