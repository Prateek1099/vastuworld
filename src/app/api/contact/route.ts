import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, category, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !category || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Insert into Vercel Postgres database
    const result = await sql`
      INSERT INTO contacts (name, phone, email, category, message)
      VALUES (${name}, ${phone}, ${email}, ${category}, ${message})
      RETURNING id, created_at;
    `;

    // Extremely simple & free Email Notification without API keys
    try {
      await fetch("https://formsubmit.co/ajax/shivvastuworld@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Lead: ${category} Consultation - ${name}`,
          Name: name,
          Phone: phone,
          Email: email,
          Category: category,
          Message: message
        }),
      });
    } catch (emailError) {
      console.error("Email notification failed, but data saved to DB", emailError);
    }

    return NextResponse.json(
      { message: "Contact saved successfully", data: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { error: "Failed to save contact" },
      { status: 500 }
    );
  }
}
