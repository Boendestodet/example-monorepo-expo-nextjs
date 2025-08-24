import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../../../context/AuthProvider";
import { router } from "expo-router";

export default function Login() {
    const { login, register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);

    async function doLogin() {
        setBusy(true);
        try {
            await login(email, password);
            router.replace("/(app)");
        } catch (e: any) {
            Alert.alert("Error", e?.message || "Login failed");
        } finally {
            setBusy(false);
        }
    }

    async function doRegister() {
        setBusy(true);
        try {
            await register(email, password);
            router.replace("/(app)");
        } catch (e: any) {
            Alert.alert("Error", e?.message || "Register failed");
        } finally {
            setBusy(false);
        }
    }

    return (
        <View style={{ flex: 1, padding: 16, gap: 12, justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Login</Text>
            <TextInput
                placeholder="email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8 }}
            />
            <TextInput
                placeholder="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8 }}
            />
            <Button title={busy ? "Working..." : "Login"} onPress={doLogin} disabled={busy} />
            <Button title="Register" onPress={doRegister} disabled={busy} />
        </View>
    );
}
