import { sql } from "@/lib/db";
import { logoutAction } from "./actions";

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif text-crimson mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your leads, users, and Vastu consultations.</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="px-6 py-2 bg-crimson text-white rounded hover:bg-crimson-light transition-colors shadow-sm"
            >
              Sign Out
            </button>
          </form>
        </div>

        {errorMsg ? (
          <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 mb-8">
            <h3 className="font-bold text-lg mb-2">Database Error</h3>
            <p>{errorMsg}</p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Consultations Table */}
            <div>
              <h2 className="text-2xl font-serif text-crimson-dark mb-4 border-b border-gray-200 pb-2">Vastu Consultations (Ask Question)</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                        <th className="py-4 px-6 font-medium">Date</th>
                        <th className="py-4 px-6 font-medium">User</th>
                        <th className="py-4 px-6 font-medium">Property Type</th>
                        <th className="py-4 px-6 font-medium">Question</th>
                        <th className="py-4 px-6 font-medium">Floor Plan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {consultations.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-gray-500">
                            No consultation questions submitted yet.
                          </td>
                        </tr>
                      ) : (
                        consultations.map((consult) => (
                          <tr key={consult.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                              {new Date(consult.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6 text-sm">
                              <div className="font-medium text-gray-900">{consult.user_name}</div>
                              <div className="text-gray-500">{consult.user_email}</div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold-dark border border-gold/20 capitalize">
                                {consult.property_type}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-700 max-w-sm truncate" title={consult.question}>
                              {consult.question}
                            </td>
                            <td className="py-4 px-6 text-sm">
                              {consult.image_url ? (
                                <a href={consult.image_url} target="_blank" rel="noopener noreferrer" className="text-crimson hover:text-gold font-medium flex items-center gap-1">
                                  View Map
                                </a>
                              ) : (
                                <span className="text-gray-400">No image</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Registered Users Table */}
            <div>
              <h2 className="text-2xl font-serif text-crimson-dark mb-4 border-b border-gray-200 pb-2">Registered Users</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                        <th className="py-4 px-6 font-medium">Joined Date</th>
                        <th className="py-4 px-6 font-medium">Name</th>
                        <th className="py-4 px-6 font-medium">Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-12 text-center text-gray-500">
                            No users registered yet.
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                              {user.name}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-700">
                              {user.email}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* General Contacts Table (Legacy/Contact Us page) */}
            <div>
              <h2 className="text-2xl font-serif text-crimson-dark mb-4 border-b border-gray-200 pb-2">General Leads & Contacts</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                        <th className="py-4 px-6 font-medium">Date</th>
                        <th className="py-4 px-6 font-medium">Name</th>
                        <th className="py-4 px-6 font-medium">Contact</th>
                        <th className="py-4 px-6 font-medium">Category</th>
                        <th className="py-4 px-6 font-medium">Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {contacts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-gray-500">
                            No general contact requests yet.
                          </td>
                        </tr>
                      ) : (
                        contacts.map((contact) => (
                          <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                              {new Date(contact.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                              {contact.name}
                            </td>
                            <td className="py-4 px-6 text-sm">
                              <div className="text-gray-900">{contact.phone}</div>
                              <div className="text-gray-500">{contact.email}</div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {contact.category}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-700 max-w-xs truncate" title={contact.message}>
                              {contact.message}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
