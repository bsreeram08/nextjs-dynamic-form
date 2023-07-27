"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Home() {
  const { setTheme } = useTheme();
  setTheme("dark");
  return (
    <div className="grid h-screen place-items-center">
      <Button>Hello</Button>
    </div>
  );
}
