import { Platform } from "react-native";

const TOKEN_KEY = "auth_token";

// Platform-specific storage implementation
async function getStorageItem(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    // Web: use localStorage
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  } else {
    // Mobile: use SecureStore
    try {
      const { getItemAsync } = await import("expo-secure-store");
      return await getItemAsync(key);
    } catch {
      return null;
    }
  }
}

async function setStorageItem(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") {
    // Web: use localStorage
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore errors
    }
  } else {
    // Mobile: use SecureStore
    try {
      const { setItemAsync } = await import("expo-secure-store");
      await setItemAsync(key, value);
    } catch {
      // Ignore errors
    }
  }
}

async function removeStorageItem(key: string): Promise<void> {
  if (Platform.OS === "web") {
    // Web: use localStorage
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore errors
    }
  } else {
    // Mobile: use SecureStore
    try {
      const { deleteItemAsync } = await import("expo-secure-store");
      await deleteItemAsync(key);
    } catch {
      // Ignore errors
    }
  }
}

export async function saveToken(token: string) {
  await setStorageItem(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return getStorageItem(TOKEN_KEY);
}

export async function clearToken() {
  await removeStorageItem(TOKEN_KEY);
}
