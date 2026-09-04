/**
 * Renders a single JSON-LD script tag. Server component — no client cost.
 * Suppresses hydration mismatch warnings because JSON.stringify output is
 * stable and safe.
 */
interface Props {
  data: unknown;
}

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
