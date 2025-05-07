"use client";

import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // form = { username, email, password }
      });

      const data = await res.json();

      if (!res.ok) {
        // handle error response
        console.error("Error:", data.error || "Something went wrong");
        alert(data.error || "Registration failed");
        return;
      }

      // success
      console.log("Success:", data.message);
      alert("Registration successful!");
      // Optional: redirect to login or dashboard
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Name"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
