"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Test() {
  useEffect(() => {
    async function check() {
      const start = Date.now();

      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .limit(1);

      console.log("TIME:", Date.now() - start);
      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    check();
  }, []);

  return <div className="text-white">Тест сети...</div>;
}