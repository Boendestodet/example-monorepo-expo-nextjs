"use client";
import { LoginForm } from "@monorepo/hello-ui/components/login-form";
import { View } from "@monorepo/hello-ui/components/view";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleLogin(email: string, password: string) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (e: any) {
      throw new Error(e?.message || "Login failed");
    }
  }

  async function handleRegister(email: string, password: string) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (e: any) {
      throw new Error(e?.message || "Registration failed");
    }
  }

  return (
    <main style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: "100%", maxWidth: 400, padding: 16 }}>
        <LoginForm onLogin={handleLogin} onRegister={handleRegister} error={error} onErrorChange={setError} />
      </View>
    </main>
  );
}
