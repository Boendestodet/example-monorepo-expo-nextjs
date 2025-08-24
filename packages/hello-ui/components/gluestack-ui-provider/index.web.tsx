"use client";
import { setFlushStyles } from "@gluestack-ui/nativewind-utils/flush";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";
import React, { useEffect, useLayoutEffect, useState } from "react";

import { config } from "./config";
import { script } from "./script";

export type ModeType = "light" | "dark" | "system";

const variableStyleTagId = "nativewind-style";
const createStyle = (styleTagId: string) => {
  const style = document.createElement("style");
  style.id = styleTagId;
  style.appendChild(document.createTextNode(""));
  return style;
};

export const useSafeLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function GluestackUIProvider({ mode = "light", ...props }: { mode?: ModeType; children?: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  let cssVariablesWithMode = ``;
  Object.keys(config).forEach((configKey) => {
    cssVariablesWithMode += configKey === "dark" ? `\n .dark {\n ` : `\n:root {\n`;
    const cssVariables = Object.keys(config[configKey as keyof typeof config]).reduce((acc: string, curr: string) => {
      acc += `${curr}:${config[configKey as keyof typeof config][curr]}; `;
      return acc;
    }, "");
    cssVariablesWithMode += `${cssVariables} \n}`;
  });

  setFlushStyles(cssVariablesWithMode);

  const handleMediaQuery = React.useCallback((e: MediaQueryListEvent) => {
    script(e.matches ? "dark" : "light");
  }, []);

  // Mark as client after hydration
  useEffect(() => {
    setIsClient(true);
    setIsHydrated(true);
  }, []);

  // Set initial color scheme during SSR and after hydration
  useSafeLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const documentElement = document.documentElement;
      if (documentElement) {
        // Ensure we don't override the server-rendered attributes during hydration
        if (!isHydrated) {
          // During SSR, just ensure the classes are present
          if (!documentElement.classList.contains(mode)) {
            documentElement.classList.add(mode);
          }
          if (mode === "light" && documentElement.classList.contains("dark")) {
            documentElement.classList.remove("dark");
          } else if (mode === "dark" && documentElement.classList.contains("light")) {
            documentElement.classList.remove("light");
          }
        } else {
          // After hydration, we can safely manipulate the DOM
          documentElement.classList.remove("light", "dark");
          documentElement.classList.add(mode);
          documentElement.style.colorScheme = mode;
        }
      }
    }
  }, [mode, isHydrated]);

  // Handle mode changes after hydration
  useSafeLayoutEffect(() => {
    if (!isHydrated) return;

    if (mode !== "system") {
      const documentElement = document.documentElement;
      if (documentElement) {
        documentElement.classList.remove("light", "dark");
        documentElement.classList.add(mode);
        documentElement.style.colorScheme = mode;
      }
    }
  }, [mode, isHydrated]);

  useSafeLayoutEffect(() => {
    if (!isHydrated || mode !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    media.addListener(handleMediaQuery);

    return () => media.removeListener(handleMediaQuery);
  }, [handleMediaQuery, mode, isHydrated]);

  useSafeLayoutEffect(() => {
    if (!isHydrated) return;

    if (typeof window !== "undefined") {
      const documentElement = document.documentElement;
      if (documentElement) {
        const head = documentElement.querySelector("head");
        let style = head?.querySelector(`[id='${variableStyleTagId}']`);
        if (!style) {
          style = createStyle(variableStyleTagId);
          style.innerHTML = cssVariablesWithMode;
          if (head) head.appendChild(style);
        }
      }
    }
  }, [isHydrated]);

  return (
    <>
      {isClient && (
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(${script.toString()})('${mode}')`,
          }}
        />
      )}
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </>
  );
}
