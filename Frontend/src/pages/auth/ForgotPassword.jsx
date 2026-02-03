import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      return setError("Email is required");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email },
      );

      setMessage(res.data.message || "Reset link sent to your email");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter your registered email address and we’ll send you a reset link.
        </p>

        {/* Success */}
        {message && (
          <p className="text-green-600 text-sm text-center mb-3">{message}</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 py-2 rounded font-semibold hover:bg-yellow-500 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Bottom Links */}
        <div className="mt-5 text-center text-sm text-gray-600 space-y-2">
          <p>
            Remembered your password?
            <NavLink
              to="/login"
              className="text-yellow-500 font-semibold ml-1 hover:underline"
            >
              Login
            </NavLink>
          </p>

          <p>
            Don’t have an account?
            <NavLink
              to="/register"
              className="text-yellow-500 font-semibold ml-1 hover:underline"
            >
              Create one
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
