import { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { apiFetch } from "../../../lib/api";
import { useAuth } from "../../../context/AuthProvider";
import { router } from "expo-router";

type Post = { id: number; title: string; content?: string | null };

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        apiFetch("/api/posts")
            .then(setPosts)
            .catch((err: any) => console.warn("Posts error:", err?.message));
    }, []);

    async function doLogout() {
        await logout();
        router.replace("/(auth)/login");
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Welcome {user?.email}</Text>
            <View style={{ height: 12 }} />
            {posts.map(p => (
                <View key={p.id} style={{ paddingVertical: 8 }}>
                    <Text style={{ fontWeight: "600" }}>{p.title}</Text>
                    {p.content ? <Text>{p.content}</Text> : null}
                </View>
            ))}
            <View style={{ height: 16 }} />
            <Button title="Logout" onPress={doLogout} />
        </ScrollView>
    );
}
