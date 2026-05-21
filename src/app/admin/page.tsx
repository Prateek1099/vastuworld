import { sql } from "@/lib/db";
import { logoutAction } from "./actions";

import AdminClientView from "./AdminClientView";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let contacts: any[] = [];
  let users: any[] = [];
  let consultations: any[] = [];
  let errorMsg = "";

  try {
    // 1. Fetch legacy contacts
    const contactsData = await sql`
      SELECT * FROM contacts 
      ORDER BY created_at DESC 
      LIMIT 100;
    `;
    contacts = contactsData.rows || [];

    // 2. Fetch users
    const usersData = await sql`
      SELECT id, name, email, created_at FROM users
      ORDER BY created_at DESC
      LIMIT 100;
    `;
    users = usersData.rows || [];

    // 3. Fetch consultations with user info
    const consultsData = await sql`
      SELECT c.*, u.name as user_name, u.email as user_email
      FROM consultations c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
      LIMIT 100;
    `;
    consultations = consultsData.rows || [];

  } catch (error: any) {
    console.error("Failed to fetch admin DB:", error);
    if (error.message?.includes("relation") || error.name === "VercelPostgresError") {
      errorMsg = "Database hasn't been fully initialized. Please visit /api/init to create tables, or check your Vercel Postgres connection.";
    } else {
      errorMsg = "Failed to load database. Have you created the Vercel Postgres storage yet?";
    }
  }

  return (
    <AdminClientView 
      consultations={consultations}
      users={users}
      contacts={contacts}
      errorMsg={errorMsg}
    />
  );
}
