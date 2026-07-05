"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    location.href="/";
  }

  if (!user) {
    return (
      <div className="text-white p-10">
        Загрузка...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
      <div className="bg-slate-900 p-8 rounded-xl w-[500px]">

        <h1 className="text-3xl font-bold mb-5">
          Профиль
        </h1>

        <p className="mb-3">
          Email: {user.email}
        </p>

        <p className="mb-5">
          ID: {user.id}
        </p>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Выйти
        </button>

      </div>
    </main>
  );
}