"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function signIn() {
    const { error } =
      await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            "http://localhost:3000/profile",
        },
      });
  
    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }
  
    alert("Письмо отправлено");
  }
  
  return (
    <main className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
      <div className="bg-slate-900 p-8 rounded-xl w-[400px]">
        <h1 className="text-2xl font-bold mb-5">
          Вход
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-slate-800 mb-4"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button
          onClick={signIn}
          className="w-full bg-blue-600 p-3 rounded"
        >
          Войти
        </button>
      </div>
    </main>
  );
}