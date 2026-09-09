import { getTestimonials } from '@/lib/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TestimonialCards } from './TestimonialCards';

/** Quote cards on cream — carousel on phones, grid from md up. */
export async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <Section id="testimonials" tone="cream" spacing="default" labelledBy="testimonials-heading">
      <SectionHeading
        id="testimonials-heading"
        eyebrow="Kind words"
        title="What people say after the parcel arrives"
        intro="Collected from WhatsApp messages, with permission. Every one of these started as a single DM."
      />

      <TestimonialCards testimonials={testimonials} />
    </Section>
  );
}
