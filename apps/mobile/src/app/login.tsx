import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { saveToken } from "../../lib/auth";

const API_BASE = process.env.EXPO_PUBLIC_API_URL || "http://192.168.2.101:3000";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);

    async function submit(path: "/api/auth/login" | "/api/auth/register") {
        try {
            setBusy(true);
            const res = await fetch(`${API_BASE}${path}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) return Alert.alert("Error", data.error || "Failed");
            if (data.token) await saveToken(data.token);
            Alert.alert("OK", "Signed in!");
        } catch (e: any) {
            Alert.alert("Error", e?.message || "Network error");
        } finally {
            setBusy(false);
        }
    }

    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Login</Text>
            <TextInput placeholder="email" autoCapitalize="none" value={email} onChangeText={setEmail}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8 }} />
            <TextInput placeholder="password" secureTextEntry value={password} onChangeText={setPassword}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8 }} />
            <Button title={busy ? "Working..." : "Login"} onPress={() => submit("/api/auth/login")} disabled={busy} />
            <Button title="Register" onPress={() => submit("/api/auth/register")} disabled={busy} />
        </View>
    );
}
