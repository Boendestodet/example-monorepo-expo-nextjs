import React, { useState } from "react";

import { Button, ButtonText, ButtonSpinner } from "../button";
import { Heading } from "../heading";
import { Input, InputField } from "../input";
import { Text } from "../text";
import { View } from "../view";
import { VStack } from "../vstack";

export interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string) => Promise<void>;
  title?: string;
  showRegister?: boolean;
  loadingText?: string;
  loginText?: string;
  registerText?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  error?: string;
  onErrorChange?: (error: string) => void;
}

export function LoginForm({
  onLogin,
  onRegister,
  title = "Login",
  showRegister = true,
  loadingText = "Working...",
  loginText = "Login",
  registerText = "Register",
  emailPlaceholder = "Email",
  passwordPlaceholder = "Password",
  error,
  onErrorChange,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      const errorMsg = "Please enter both email and password";
      onErrorChange?.(errorMsg);
      return;
    }

    setBusy(true);
    onErrorChange?.("");

    try {
      await onLogin(email, password);
    } catch (e: any) {
      onErrorChange?.(e?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      const errorMsg = "Please enter both email and password";
      onErrorChange?.(errorMsg);
      return;
    }

    if (password.length < 6) {
      const errorMsg = "Password must be at least 6 characters";
      onErrorChange?.(errorMsg);
      return;
    }

    setBusy(true);
    onErrorChange?.("");

    try {
      await onRegister(email, password);
    } catch (e: any) {
      onErrorChange?.(e?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <VStack space='md' style={{ alignItems: "center" }}>
      <Heading size='2xl' bold>
        {title}
      </Heading>

      {error && (
        <View
          style={{
            backgroundColor: "#fee2e2",
            borderWidth: 1,
            borderColor: "#f87171",
            borderRadius: 8,
            padding: 12,
            width: "100%",
          }}>
          <Text size='sm' style={{ color: "#dc2626" }}>
            {error}
          </Text>
        </View>
      )}

      <Input size='lg' variant='outline' style={{ width: "100%" }}>
        <InputField placeholder={emailPlaceholder} autoCapitalize='none' keyboardType='email-address' value={email} onChangeText={setEmail} />
      </Input>

      <Input size='lg' variant='outline' style={{ width: "100%" }}>
        <InputField placeholder={passwordPlaceholder} secureTextEntry value={password} onChangeText={setPassword} />
      </Input>

      <Button size='lg' variant='solid' action='primary' onPress={handleLogin} disabled={busy} style={{ width: "100%" }}>
        {busy ? (
          <>
            <ButtonSpinner />
            <ButtonText>{loadingText}</ButtonText>
          </>
        ) : (
          <ButtonText>{loginText}</ButtonText>
        )}
      </Button>

      {showRegister && (
        <Button size='lg' variant='outline' action='secondary' onPress={handleRegister} disabled={busy} style={{ width: "100%" }}>
          <ButtonText>{registerText}</ButtonText>
        </Button>
      )}
    </VStack>
  );
}
