"use client";

import { useState } from "react";
import { Users, HelpCircle, MessageSquare, LogOut, FileText } from "lucide-react";

export default function AdminClientView({ 
  consultations, 
  users, 
  contacts, 
  errorMsg 
}: { 
  consultations: any[];
  users: any[];
  contacts: any[];
  errorMsg: string;
}) {
  const [activeTab, setActiveTab] = useState('consultations');

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-red-50 text-red-700 p-8 rounded-xl border border-red-200 max-w-lg w-full shadow-sm">
          <h3 className="font-serif font-bold text-2xl mb-4 text-red-800">Database Error</h3>
          <p className="mb-6">{errorMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="mb-10 mt-2">
          <h1 className="text-2xl font-serif text-crimson mb-1">Admin Panel</h1>
          <p className="text-xs text-gray-500 tracking-wider uppercase">Shiv Vastu World</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('consultations')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'consultations' ? 'bg-crimson/10 text-crimson font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <HelpCircle size={20} />
            <span>Consultations</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-crimson/10 text-crimson font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users size={20} />
            <span>Registered Users</span>
          </button>

          <button 
            onClick={() => setActiveTab('contacts')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'contacts' ? 'bg-crimson/10 text-crimson font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <MessageSquare size={20} />
            <span>General Leads</span>
          </button>
        </nav>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <form action={async () => {
             const { logoutAction } = await import("./actions");
             await logoutAction();
          }}>
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto pb-20">
          
          {/* Consultations Tab */}
          {activeTab === 'consultations' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-serif text-crimson-dark mb-6">Vastu Consultations</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                        <th className="py-4 px-6 font-medium whitespace-nowrap">Date</th>
                        <th className="py-4 px-6 font-medium whitespace-nowrap">User</th>
                        <th className="py-4 px-6 font-medium whitespace-nowrap">Property Type</th>
                        <th className="py-4 px-6 font-medium">Question / Description</th>
                        <th className="py-4 px-6 font-medium whitespace-nowrap">Floor Plan</th>
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
                          <tr key={consult.id} className="hover:bg-gray-50 transition-colors items-start">
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap align-top">
                              {new Date(consult.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6 text-sm align-top">
                              <div className="font-medium text-gray-900">{consult.user_name}</div>
                              <div className="text-gray-500">{consult.user_email}</div>
                            </td>
                            <td className="py-4 px-6 align-top">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gold/10 text-gold-dark border border-gold/20 capitalize whitespace-nowrap">
                                {consult.property_type}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-700 align-top min-w-[300px] md:min-w-[400px]">
                              {/* Using whitespace-pre-wrap to respect line breaks and removing truncate to show full text */}
                              <div className="whitespace-pre-wrap leading-relaxed">{consult.question}</div>
                            </td>
                            <td className="py-4 px-6 text-sm align-top whitespace-nowrap">
                              {consult.image_url ? (
                                <a href={consult.image_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 px-3 py-1.5 bg-crimson/5 hover:bg-crimson/10 text-crimson rounded-md transition-colors border border-crimson/20">
                                  <FileText size={16} />
                                  <span>View Map</span>
                                </a>
                              ) : (
                                <span className="text-gray-400 italic">No image</span>
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
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-serif text-crimson-dark mb-6">Registered Users</h2>
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
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-serif text-crimson-dark mb-6">General Leads & Contacts</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                        <th className="py-4 px-6 font-medium whitespace-nowrap">Date</th>
                        <th className="py-4 px-6 font-medium whitespace-nowrap">Name</th>
                        <th className="py-4 px-6 font-medium whitespace-nowrap">Contact</th>
                        <th className="py-4 px-6 font-medium whitespace-nowrap">Category</th>
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
                          <tr key={contact.id} className="hover:bg-gray-50 transition-colors items-start">
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap align-top">
                              {new Date(contact.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap align-top">
                              {contact.name}
                            </td>
                            <td className="py-4 px-6 text-sm align-top">
                              <div className="text-gray-900">{contact.phone}</div>
                              <div className="text-gray-500">{contact.email}</div>
                            </td>
                            <td className="py-4 px-6 align-top">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
                                {contact.category}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-700 align-top min-w-[300px] md:min-w-[400px]">
                              {/* Expanding message cell for big descriptions */}
                              <div className="whitespace-pre-wrap leading-relaxed">{contact.message}</div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
