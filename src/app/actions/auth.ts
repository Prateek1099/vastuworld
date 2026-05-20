"use server";

import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { error: "All fields are required" };
    }

    // Check if user exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.rows.length > 0) {
      return { error: "User already exists with this email" };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const result = await sql`
      INSERT INTO users (name, email, password_hash) 
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING id, name, email
    `;

    const user = result.rows[0];

    // Set cookie
    (await cookies()).set("user_session", JSON.stringify({ id: user.id, name: user.name, email: user.email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true, user };
  } catch (error: any) {
    console.error("Registration error:", error);
    // Graceful fallback if DB is not connected
    if (error.message?.includes("relation \"users\" does not exist") || error.name === "VercelPostgresError") {
       return { error: "Database not connected. Please configure Vercel Postgres." };
    }
    return { error: "Failed to register user" };
  }
}

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "All fields are required" };
    }

    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = result.rows[0];

    if (!user) {
      return { error: "Invalid email or password" };
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return { error: "Invalid email or password" };
    }

    // Set cookie
    (await cookies()).set("user_session", JSON.stringify({ id: user.id, name: user.name, email: user.email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true, user: { id: user.id, name: user.name, email: user.email } };
  } catch (error: any) {
    console.error("Login error:", error);
    if (error.message?.includes("relation \"users\" does not exist") || error.name === "VercelPostgresError") {
       return { error: "Database not connected. Please configure Vercel Postgres." };
    }
    return { error: "Failed to login" };
  }
}

export async function logoutUser() {
  (await cookies()).delete("user_session");
}

export async function getCurrentUser() {
  const session = (await cookies()).get("user_session");
  if (!session?.value) return null;
  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}
