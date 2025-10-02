"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1>Something went wrong</h1>
          {error?.message && <p>{error.message}</p>}
          {typeof reset === "function" && (
            <button
              onClick={reset}
              style={{
                backgroundColor: "#111827",
                borderRadius: "0.5rem",
                color: "#ffffff",
                padding: "0.75rem 1.5rem",
              }}
            >
              Try again
            </button>
          )}
        </div>
      </body>
    </html>
  );
}
