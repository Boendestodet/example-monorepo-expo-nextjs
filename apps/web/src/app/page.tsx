"use client";
import { Button, ButtonText, ButtonSpinner, ButtonIcon } from "@monorepo/hello-ui/components/button";
import { Heading } from "@monorepo/hello-ui/components/heading";
import { AddIcon } from "@monorepo/hello-ui/components/icon";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

// --------------------------------------------------------------------
export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <main style={{ height: "100vh" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Heading size='2xl'>Hello UI</Heading>
        <Text>This is the first page of your app.</Text>

        <Button size='md' variant='solid' action='primary'>
          <ButtonText>Hello World!</ButtonText>
          <ButtonSpinner />
          <ButtonIcon as={AddIcon} />
        </Button>

        <View style={{ marginTop: 20 }}>
          <Text>Posts:</Text>
          {posts.map((post) => (
            <Text key={post.id}>{post.title}</Text>
          ))}
        </View>
      </View>
    </main>
  );
}
