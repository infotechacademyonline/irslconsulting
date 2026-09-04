import { clsx } from 'clsx';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';

const base = 'inline-flex items-center gap-2 rounded font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white px-6 py-3.5 text-[15px] hover:bg-brand-deep',
  secondary:
    'border-2 border-brand text-brand bg-transparent px-5 py-3 text-[15px] hover:bg-tint hover:text-brand-deep',
  ghost: 'text-ink font-semibold underline underline-offset-4 decoration-ink hover:decoration-brand hover:text-brand',
};

interface Props extends React.ComponentProps<'button'> {
  variant?: Variant;
  href?: string;
}

export function Button({ variant = 'primary', href, className, children, ...rest }: Props) {
  const cls = clsx(base, variants[variant], className);
  if (href) {
    // Internal vs external
    if (href.startsWith('/') || href.startsWith('#')) {
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
