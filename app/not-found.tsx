import Link from 'next/link';

import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="max-w-[60ch] text-center">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
          404
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Page not found.
        </h1>
        <p className="mt-4 text-[17px] text-muted">
          The page you asked for is not here. Try{' '}
          <Link href="/" className="text-brand">
            the home page
          </Link>{' '}
          or the{' '}
          <Link href="/solutions" className="text-brand">
            nine solutions
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
