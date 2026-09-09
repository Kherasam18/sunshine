import { getOccasionBySlug, getProductsByOccasion } from '@/lib/content';
import type { Product } from '@/types';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/ui/ProductCard';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

/**
 * Cross-sell by occasion rather than category — someone buying modak candles
 * for Ganesh Chaturthi is far more likely to want a Ganesha standee than
 * another candle.
 */
export async function RelatedProducts({ product }: { product: Product }) {
  const occasionSlug = product.occasions[0];
  if (!occasionSlug) return null;

  const [occasion, candidates] = await Promise.all([
    getOccasionBySlug(occasionSlug),
    getProductsByOccasion(occasionSlug),
  ]);

  const pool = candidates.filter((item) => item.slug !== product.slug);
  // Lead with pieces from a different craft, then fill from the same one.
  const otherCrafts = pool.filter((item) => item.category !== product.category);
  const sameCraft = pool.filter((item) => item.category === product.category);
  const related = [...otherCrafts, ...sameCraft].slice(0, 4);

  if (related.length === 0 || !occasion) return null;

  return (
    <Section tone="ivory" spacing="default" labelledBy="related-heading">
      <SectionHeading
        id="related-heading"
        eyebrow={`Also for ${occasion.name}`}
        title="Gifted together, more often than not"
        intro={occasion.giftNote}
      />

      <RevealGroup
        className="mt-12 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-7"
        stagger={0.07}
      >
        {related.map((item) => (
          <RevealItem key={item.slug} className="h-full">
            <ProductCard
              product={item}
              sizes="(max-width: 479px) 92vw, (max-width: 767px) 46vw, (max-width: 1279px) 31vw, 23vw"
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
