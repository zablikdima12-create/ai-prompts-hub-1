"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

useEffect(() => {
  async function loadUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUser(session?.user || null);
  }

  loadUser();
}, []);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/prompts", label: "Промты" },
    { href: "/categories", label: "Категории" },
    { href: "/favorites", label: "Избранное" },
    { href: "/generator", label: "Генератор" },
    { href: "/my-prompts", label: "Мои промты" },
    { href: "/history", label: "История" },
    { href: "/add-prompt", label: "Добавить" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="AI Prompts Hub"
            width={40}
            height={40}
            className="rounded-lg"
          />

<span className="hidden sm:block font-bold text-xl text-white">
  AI Prompts Hub
</span>
        </Link>
        <button
  onClick={() => setIsOpen(!isOpen)}
  className="md:hidden text-white text-3xl"
>
  {isOpen ? "✕" : "☰"}
</button>

        <div className="hidden md:flex gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl transition ${
                pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
  <Link
    href="/profile"
    className={`px-4 py-2 rounded-xl transition ${
      pathname === "/profile"
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`}
  >
    Профиль
  </Link>
) : (
  <Link
    href="/login"
    className={`px-4 py-2 rounded-xl transition ${
      pathname === "/login"
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`}
  >
    Войти
  </Link>
)}
        </div>

      </div>
      {isOpen && (
  <div className="md:hidden border-t border-slate-800 bg-slate-950">
    <div className="flex flex-col p-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setIsOpen(false)}
          className={`px-4 py-3 rounded-xl transition ${
            pathname === link.href
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          {link.label}
        </Link>
      ))}
      {user ? (
  <Link
    href="/profile"
    className="bg-green-600 px-4 py-2 rounded-xl"
  >
    Профиль
  </Link>
) : (
  <Link
    href="/login"
    className="bg-blue-600 px-4 py-2 rounded-xl"
  >
    Войти
  </Link>
)}
    </div>
  </div>
)}
    </nav>
  );
}