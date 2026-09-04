// No-op replacement for the `server-only` package during Vitest runs. The real
// package throws when imported from a client bundle; in tests that guardrail
// is unhelpful (Node has no such boundary).
export {};
