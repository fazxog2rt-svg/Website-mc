"use client";
import { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/lib/constants";

export function useDiscordUrl(): string {
  const [url, setUrl] = useState(SITE_CONFIG.discordUrl);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((cfg) => {
        if (cfg.discordUrl) setUrl(cfg.discordUrl);
      })
      .catch(() => {});
  }, []);

  return url;
}
