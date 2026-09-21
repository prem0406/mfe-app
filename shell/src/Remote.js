import { Component, Suspense, lazy, useMemo, useState } from "react";

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Send to your monitoring tool here (Sentry, Datadog, etc.)
    console.error(
      `[MFE:${this.props.name}] failed`,
      error,
      info.componentStack,
    );
  }

  render() {
    const { error } = this.state;
    return error ? this.props.fallback({ error }) : this.props.children;
  }
}

function DefaultFallback({ name, error, onRetry }) {
  return (
    <div
      role="alert"
      style={{
        border: "2px solid #f59e0b",
        background: "#fffbeb",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <h3>⚠️ The {name} section is unavailable</h3>
      <p>
        We couldn't load this part of the app. The rest of the site still works.
      </p>
      <button onClick={onRetry}>Retry</button>{" "}
      <button onClick={() => window.location.reload()}>Reload page</button>
      <details style={{ marginTop: 8 }}>
        <summary>Technical details</summary>
        <pre>{String(error?.message)}</pre>
      </details>
    </div>
  );
}

export default function Remote({
  name,
  loader,
  fallback,
  loading = <p>Loading {name}…</p>,
}) {
  const [attempt, setAttempt] = useState(0);

  // A new lazy() per attempt: React caches a rejected lazy forever, so retrying needs a fresh one
  const Component = useMemo(() => lazy(loader), [loader, attempt]);
  const retry = () => setAttempt((a) => a + 1);

  return (
    <ErrorBoundary
      key={attempt} // remounting the boundary clears its error state
      name={name}
      fallback={({ error }) =>
        fallback ? (
          fallback({ error, retry })
        ) : (
          <DefaultFallback name={name} error={error} onRetry={retry} />
        )
      }
    >
      <Suspense fallback={loading}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}
