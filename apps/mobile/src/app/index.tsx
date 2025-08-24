import { Button, ButtonText, ButtonSpinner, ButtonIcon } from "@monorepo/hello-ui/components/button";
import { Heading } from "@monorepo/hello-ui/components/heading";
import { AddIcon } from "@monorepo/hello-ui/components/icon";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

// --------------------------------------------------------------------
export default function Page() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL || "http://192.168.2.101:3000"}/api/posts`)
      .then((r) => r.json())
      .then(setPosts)
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
        // You can add better error handling here
      });
  }, []);

  return (
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
  );
}
