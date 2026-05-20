"use server";

import { sql } from "@/lib/db";
import { getCurrentUser } from "./auth";
import fs from "fs";
import path from "path";

export async function submitConsultation(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { error: "You must be logged in to submit a consultation." };
    }

    const propertyType = formData.get("propertyType") as string;
    const question = formData.get("question") as string;
    const file = formData.get("image") as File | null;

    if (!propertyType || !question) {
      return { error: "Property type and question are required." };
    }

    let imageUrl: string | null = null;
    if (file && file.size > 0 && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create uploads directory in public if it doesn't exist
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate a unique clean filename
      const cleanFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadDir, cleanFileName);

      // Write file to filesystem
      await fs.promises.writeFile(filePath, buffer);
      imageUrl = `/uploads/${cleanFileName}`;
    }

    await sql`
      INSERT INTO consultations (user_id, property_type, question, image_url)
      VALUES (${user.id}, ${propertyType}, ${question}, ${imageUrl})
    `;

    return { success: true };
  } catch (error: any) {
    console.error("Consultation submission error:", error);
    if (error.name === "VercelPostgresError" || error.message?.includes("relation")) {
      return { error: "Database not connected. Please configure Vercel Postgres." };
    }
    return { error: "Failed to submit consultation: " + error.message };
  }
}
