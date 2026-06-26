"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "1rem", textAlign: "center", fontFamily: "sans-serif" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "#1d4ed8" }}>
            Something went wrong
          </p>
          <h2 style={{ marginTop: "0.75rem", fontSize: "1.5rem", fontWeight: 700, color: "#0f172a" }}>
            A critical error occurred
          </h2>
          <p style={{ marginTop: "0.75rem", maxWidth: "28rem", fontSize: "0.875rem", lineHeight: "1.5rem", color: "#64748b" }}>
            We ran into a problem. Please try refreshing the page.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: "2rem", padding: "0.625rem 1.5rem", borderRadius: "9999px", background: "#2563eb", color: "#fff", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
