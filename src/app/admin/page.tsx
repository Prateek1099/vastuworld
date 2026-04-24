import { sql } from "@vercel/postgres";
import { logoutAction } from "./actions";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let contacts = [];
  let errorMsg = "";

  try {
    const data = await sql`
      SELECT * FROM contacts 
      ORDER BY created_at DESC 
      LIMIT 100;
    `;
    contacts = data.rows || [];
  } catch (error: any) {
    console.error("Failed to fetch contacts DB:", error);
    if (error.message?.includes("relation \"contacts\" does not exist")) {
      errorMsg = "Database hasn't been initialized yet. Please visit /api/init on your website to create the tables.";
    } else {
      errorMsg = "Failed to load database. Have you created the Vercel Postgres storage yet?";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif text-crimson mb-2">Shopify-Style Leads Dashboard</h1>
            <p className="text-gray-600">View all your consultation requests below.</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="px-4 py-2 border border-crimson text-crimson rounded hover:bg-crimson hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>

        {errorMsg ? (
          <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200">
            <h3 className="font-bold text-lg mb-2">Database Error</h3>
            <p>{errorMsg}</p>
          </div>
        ) : (
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
                        No consultation requests yet.
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
        )}
      </div>
    </div>
  );
}
