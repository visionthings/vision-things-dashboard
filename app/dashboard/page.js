"use client";
import DashboardHome from "@/components/dashboard/home/DashboardHome";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (!isLoggedIn) {
      router.push("/");
    }
  }
  return (
    <main>
      <DashboardHome />
    </main>
  );
}
