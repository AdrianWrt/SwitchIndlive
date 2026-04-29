"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import GoogleLoginButton from '@/components/GoogleLoginButton'

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

      <div>
        <GoogleLoginButton />
      </div>

      <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <a href="/register" className="text-black font-medium hover:underline">
          Create one
        </a>
      </p>
    </main>
  );
}
