import { LoginForm } from "@monorepo/hello-ui/components/login-form";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Alert } from "react-native";

import { useAuth } from "../../../context/AuthProvider";

export default function Login() {
  const { login, register } = useAuth();
  const [error, setError] = useState("");

  async function handleLogin(email: string, password: string) {
    try {
      await login(email, password);
      router.replace("/(app)");
    } catch (e: any) {
      throw new Error(e?.message || "Login failed");
    }
  }

  async function handleRegister(email: string, password: string) {
    try {
      await register(email, password);
      router.replace("/(app)");
    } catch (e: any) {
      throw new Error(e?.message || "Register failed");
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <LoginForm onLogin={handleLogin} onRegister={handleRegister} error={error} onErrorChange={setError} />
    </View>
  );
}
