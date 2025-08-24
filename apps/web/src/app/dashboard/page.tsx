"use client";
import { Button, ButtonText } from "@monorepo/hello-ui/components/button";
import { Heading } from "@monorepo/hello-ui/components/heading";
import { ScrollView } from "@monorepo/hello-ui/components/scroll-view";
import { Text } from "@monorepo/hello-ui/components/text";
import { View } from "@monorepo/hello-ui/components/view";
import { VStack } from "@monorepo/hello-ui/components/vstack";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Post = { id: number; title: string; content?: string | null };

export default function DashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from API
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Posts error:", err?.message);
        setLoading(false);
      });
  }, []);

  async function doLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  }

  if (loading) {
    return (
      <main style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <View>
          <Text>Loading...</Text>
        </View>
      </main>
    );
  }

  return (
    <main style={{ height: "100vh" }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <VStack space='md'>
          <Heading size='xl' bold>
            Dashboard
          </Heading>

          <Text size='lg'>Welcome to your dashboard!</Text>

          <View style={{ height: 12 }} />

          {posts.length > 0 ? (
            posts.map((post) => (
              <View key={post.id} style={{ paddingVertical: 8 }}>
                <Text bold>{post.title}</Text>
                {post.content && <Text>{post.content}</Text>}
              </View>
            ))
          ) : (
            <Text>No posts available.</Text>
          )}

          <View style={{ height: 16 }} />

          <Button size='md' variant='outline' action='negative' onPress={doLogout}>
            <ButtonText>Logout</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </main>
  );
}
