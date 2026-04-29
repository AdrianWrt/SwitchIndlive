"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleCredentialsLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/",
    });

  }

  return (
    <main className="p-8 max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <form onSubmit={handleCredentialsLogin} className="space-y-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>

      <hr className="my-4" />

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex items-center justify-center gap-2 w-full py-2 rounded shadow hover:shadow-md transition-colors"
        style={{ backgroundColor: "#4285F4", color: "white" }}
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 48 48"
        >
            <path
                fill="#fff"
                d="M44.5 20H24v8.5h11.7C34.4 34 30 38 24 38c-8 0-14.5-6.5-14.5-14.5S16 9 24 9c3.8 0 7.3 1.4 10 3.7l6.8-6.8C35.7 2.8 30.1 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24c12 0 22-9 22-22 0-1.5-.1-2.5-.5-4z"
            />
        </svg>
        Continue with Google
    </button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <a href="/register" className="text-black font-medium hover:underline">
          Create one
        </a>
      </p>
    </main>
  );
}
