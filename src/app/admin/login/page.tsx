"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

const initialState = {
  error: "",
};

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    const result = await loginAction(formData);
    if (result?.error) {
      return { error: result.error };
    }
    return prevState;
  }, initialState);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gold/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-crimson mb-2">Admin Access</h1>
          <p className="text-gray-600">Please enter your secure password to view consultation leads.</p>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Secure Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-shadow"
              placeholder="Enter password..."
            />
            {state.error && (
              <p className="mt-2 text-sm text-red-600">{state.error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-crimson text-white py-3 rounded-md hover:bg-crimson-light transition-colors font-medium disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gold hover:text-gold-light underline">
            &larr; Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
