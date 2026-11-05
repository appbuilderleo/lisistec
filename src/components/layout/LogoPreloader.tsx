"use client";

import { useEffect, useRef, useState } from "react";

const PRELOADER_DURATION_MS = 4000;
const FADE_OUT_DURATION_MS = 600;

export default function LogoPreloader() {
  const [mounted, setMounted] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Disable scrolling on body while preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Play video with slightly accelerated rate so full 6s animation completes within 4s
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.3;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser requires interaction
        });
      }
    }

    // Start fade-out before the 4-second limit
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, PRELOADER_DURATION_MS - FADE_OUT_DURATION_MS);

    // Complete transition and remove preloader at exactly 4 seconds
    const exitTimer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      setMounted(false);
    }, PRELOADER_DURATION_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(exitTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      document.body.style.overflow = "";
      setMounted(false);
    }, 250);
  };

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-label="A carregar Lisis Tecnologias e Serviços"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#050908",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: isFadingOut ? 0 : 1,
        transition: `opacity ${FADE_OUT_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        pointerEvents: isFadingOut ? "none" : "auto",
      }}
    >
      {/* Ambient background glow to blend with any screen aspect ratio */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(1100px 760px at 50% 50%, #0B1512 0%, #060B09 48%, #030605 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Video Container with responsive sizing */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: "1920px",
          maxHeight: "1080px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          ref={videoRef}
          src="/preloader/logo-sting.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Subtle skip affordance */}
      <button
        type="button"
        onClick={handleSkip}
        aria-label="Saltar animação de introdução"
        style={{
          position: "absolute",
          bottom: "24px",
          right: "24px",
          padding: "6px 14px",
          fontSize: "12px",
          fontFamily: "var(--font-jetbrains-mono, monospace)",
          color: "rgba(255, 255, 255, 0.5)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "9999px",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          transition: "all 0.2s ease",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#00D4AA";
          e.currentTarget.style.borderColor = "rgba(0, 212, 170, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
        }}
      >
        Saltar ↵
      </button>
    </div>
  );
}
