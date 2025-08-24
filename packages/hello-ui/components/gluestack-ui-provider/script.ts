export const script = (mode: string) => {
  if (typeof document === "undefined") return;

  const documentElement = document.documentElement;
  if (!documentElement) return;

  function getSystemColorMode() {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  try {
    const isSystem = mode === "system";
    const theme = isSystem ? getSystemColorMode() : mode;

    // Remove existing classes first
    documentElement.classList.remove("light", "dark");
    // Add the new theme class
    documentElement.classList.add(theme);
    // Set the color scheme style
    documentElement.style.colorScheme = theme;
  } catch (e) {
    console.error("Error setting color scheme:", e);
  }
};
