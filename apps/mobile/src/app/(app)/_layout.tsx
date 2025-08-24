import { Stack } from "expo-router";
import { useAuth } from "../../../context/AuthProvider";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function AppLayout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/(auth)/login");
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: true }} />;
}
