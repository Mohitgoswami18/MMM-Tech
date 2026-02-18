import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Login() {
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UI state
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Google login with Supabase OAuth.
  // Supabase will redirect the user to Google, then back to this app.
  const handleGoogleLogin = async () => {
    try {
      setErrorMessage('');
      setIsGoogleLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        // `redirectTo` controls where Google sends the user after login.
        // Here we send them back to the current origin (your app's root URL).
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Google login failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Handle email + password login with Supabase.
  // If the credentials are valid, Supabase creates a session and
  // you can show your main application (e.g., dashboard) afterwards.
  const handleEmailLogin = async (event) => {
    event.preventDefault();

    try {
      setErrorMessage('');
      setIsEmailLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      // At this point the user is authenticated.
      // You can navigate to your dashboard page using your router
      // (for example, react-router's useNavigate), or just let a
      // higher-level component react to the new session.
    } catch (err) {
      setErrorMessage(err.message || 'Email login failed. Please try again.');
    } finally {
      setIsEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="bg-white rounded-xl shadow-md px-6 py-7 sm:px-8 sm:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Sign in</h1>
            <p className="text-sm text-gray-500">
              Use your account to access the dashboard.
            </p>
          </div>

          <button
            type="button"
            className="w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? 'Connecting to Google…' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              disabled={isEmailLoading}
            >
              {isEmailLoading ? 'Logging in…' : 'Login with Email'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

