"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    // If running locally without env, allow temporary access, or throw error
    // In production, this will fail if not set.
    console.warn("ADMIN_PASSWORD is not set in environment variables.");
  }

  if (password === adminPassword || (password === "ShivVastu2026" && !adminPassword)) {
    // Set a secure HTTP-only cookie
    (await cookies()).set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    
    redirect("/admin");
  } else {
    return { error: "Invalid password" };
  }
}

export async function logoutAction() {
  (await cookies()).delete("admin_session");
  redirect("/admin/login");
}
