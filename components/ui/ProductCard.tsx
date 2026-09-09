import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';
import { productEnquiryLink } from '@/lib/whatsapp';
import { BrandImage } from './BrandImage';
import { Badge } from './Badge';

/**
 * The catalogue unit. There is no cart on this site by design — every card
 * ends in a WhatsApp enquiry pre-filled with the product name.
 */
export function ProductCard({
  product,
  priority = false,
  className,
  sizes,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [image] = product.images;
  const swatches = product.colours.slice(0, 5);
  const extraColours = product.colours.length - swatches.length;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ivory ring-1 ring-cocoa/8',
        'shadow-warm transition duration-500 ease-out hover:-translate-y-1.5 hover:shadow-lift hover:ring-terracotta/25',
        'focus-within:-translate-y-1.5 focus-within:shadow-lift',
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <BrandImage
          slot={image}
          aspect="4:5"
          mobileAspect="1:1"
          priority={priority}
          sizes={sizes ?? '(max-width: 479px) 92vw, (max-width: 767px) 46vw, (max-width: 1279px) 31vw, 23vw'}
          imageClassName="transition duration-700 ease-out group-hover:scale-[1.06]"
          className="transition duration-700 ease-out group-hover:scale-[1.03]"
        />

        {product.badges?.length ? (
          <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.badges.slice(0, 2).map((badge) => (
              <Badge key={badge} tone={badge === 'Bestseller' ? 'sun' : 'outline'}>
                {badge}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4 xs:p-5">
        <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-cocoa xs:text-xl">
          {/* Stretched link: the whole card opens the product page, while the
              WhatsApp button below sits above it on the z-axis. */}
          <Link
            href={`/products/${product.slug}`}
            className="flex min-h-[44px] items-center rounded-sm transition-colors before:absolute before:inset-0 before:z-0 before:content-[''] hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-body-sm leading-relaxed text-cocoa-soft">{product.shortDescription}</p>

        {swatches.length ? (
          <div className="mt-4 flex items-center gap-1.5">
            <span className="sr-only">Available colours: {product.colours.map((c) => c.name).join(', ')}</span>
            {swatches.map((colour) => (
              <span
                key={colour.hex + colour.name}
                aria-hidden="true"
                title={colour.name}
                style={{ backgroundColor: colour.hex }}
                className="h-4 w-4 rounded-full ring-1 ring-inset ring-cocoa/20"
              />
            ))}
            {extraColours > 0 ? (
              <span aria-hidden="true" className="ml-1 text-[0.7rem] font-medium text-cocoa-soft">
                +{extraColours}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-gold/25 pt-4">
          <p className="font-display text-lg font-semibold text-terracotta-deep">{product.priceLabel}</p>
          {product.customisable ? (
            <span className="text-eyebrow font-medium uppercase tracking-[0.16em] text-cocoa-soft">
              Customisable
            </span>
          ) : null}
        </div>

        <a
          href={productEnquiryLink(product)}
          target="_blank"
          rel="noreferrer"
          className={cn(
            'relative z-10 mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-sun px-4',
            'font-sans text-sm font-medium text-cocoa transition duration-300 hover:bg-[#EB851F]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-ivory',
          )}
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          Order on WhatsApp
          <span className="sr-only">— {product.name}</span>
        </a>
      </div>
    </article>
  );
}
