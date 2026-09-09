'use client';

import { Star } from 'lucide-react';
import type { Testimonial } from '@/types';
import { SnapCarousel } from '@/components/ui/SnapCarousel';

/**
 * Quote cards. A swipeable snap carousel on phones — four stacked cards is a
 * lot of scrolling for social proof — and a plain grid from `md` up.
 */
export function TestimonialCards({ testimonials }: { testimonials: Testimonial[] }) {
  const cards = testimonials.map((testimonial) => (
    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
  ));

  return (
    <>
      <div className="mt-12 md:hidden">
        <SnapCarousel label="Customer quotes" slideClassName="w-[85%] xs:w-[62%]">
          {cards}
        </SnapCarousel>
      </div>

      <div className="mt-12 hidden gap-6 md:grid md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {cards}
      </div>
    </>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl bg-ivory p-6 shadow-warm ring-1 ring-cocoa/8 transition duration-500 hover:-translate-y-1 hover:shadow-lift hover:ring-gold/40">
      <span aria-hidden="true" className="font-display text-5xl font-bold leading-none text-gold/70">
        &ldquo;
      </span>

      <blockquote className="mt-2 flex-1 text-body-sm leading-relaxed text-cocoa">
        {testimonial.quote}
      </blockquote>

      <div aria-hidden="true" className="mt-5 flex gap-0.5 text-sun">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <span className="sr-only">Rated {testimonial.rating} out of 5</span>

      <figcaption className="mt-4 border-t border-gold/25 pt-4">
        <span className="block font-display text-lg font-semibold leading-tight text-terracotta-deep">
          {testimonial.author}
        </span>
        <span className="mt-0.5 block text-[0.8rem] text-cocoa-soft">{testimonial.location}</span>
        <span className="mt-2 block font-sans text-[0.7rem] font-medium uppercase tracking-[0.14em] text-cocoa-soft/80">
          {testimonial.context}
        </span>
      </figcaption>
    </figure>
  );
}
