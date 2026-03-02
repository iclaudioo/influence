import { LoginForm } from "@/components/admin/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Admin | Influence Circle",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#02182B] px-4">
      <LoginForm />
    </div>
  );
}
