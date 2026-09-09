'use client';

import { useId, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, MessageCircle, Sparkles } from 'lucide-react';
import { preBookingLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { RangoliCorner } from '@/components/brand/Ornaments';

interface Errors {
  name?: string;
  phone?: string;
}

/**
 * Festive pre-booking capture. Front-end only for this build: submitting
 * shows the on-brand success state and hands the visitor to WhatsApp. Wire
 * `onSubmit` to a form endpoint or CRM when the backend lands.
 */
export function PreBooking({ occasionName }: { occasionName: string }) {
  const nameId = useId();
  const phoneId = useId();
  const reduced = useReducedMotion();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};

    if (!name.trim()) nextErrors.name = 'Please tell us your name.';
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) nextErrors.phone = 'Please enter a 10-digit WhatsApp number.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  return (
    <section
      id="pre-booking"
      aria-labelledby="pre-booking-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FDF8F0_0%,#FBEEDD_50%,#FDF8F0_100%)] py-20 sm:py-24"
    >
      <RangoliCorner className="absolute -left-6 top-4 -z-10 h-56 w-56 text-gold opacity-[0.14]" />
      <RangoliCorner className="absolute -right-6 bottom-4 -z-10 h-56 w-56 rotate-180 text-gold opacity-[0.14]" />

      <div className="container">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-ivory p-7 shadow-lift ring-1 ring-gold/30 sm:p-10">
                  {submitted ? (
              <motion.div
                key="success"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.21, 0.68, 0.35, 1] }}
                className="flex flex-col items-center text-center"
                role="status"
                aria-live="polite"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sun/20 text-terracotta-deep ring-1 ring-inset ring-sun/40">
                  <Check aria-hidden="true" className="h-8 w-8" strokeWidth={2.2} />
                </span>
                <h2 className="mt-6 font-display text-3xl font-bold text-terracotta sm:text-4xl">
                  You are on the list{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}.
                </h2>
                <p className="mt-4 max-w-lg text-body-sm leading-relaxed text-cocoa-soft">
                  We will message you on WhatsApp as soon as the {occasionName} batch opens, with
                  first pick of colours and a pre-booking price. In the meantime, say hello — it
                  helps us hold your slot.
                </p>
                <Button
                  href={preBookingLink(name, occasionName)}
                  external
                  size="lg"
                  className="mt-8"
                  icon={<MessageCircle className="h-[18px] w-[18px]" />}
                >
                  Say hello on WhatsApp
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                  }}
                  className="mt-5 rounded-sm text-[0.82rem] font-medium text-cocoa-soft underline underline-offset-4 transition hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  Add another name
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-sun/15 px-4 py-1.5 font-sans text-eyebrow font-semibold uppercase text-terracotta-deep ring-1 ring-inset ring-sun/30">
                    <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                    Pre-booking open
                  </span>
                  <h2
                    id="pre-booking-heading"
                    className="mt-5 font-display text-display-2 font-bold text-terracotta"
                  >
                    Pre-booking is open for {occasionName}.
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-body-sm leading-relaxed text-cocoa-soft">
                    Festive batches fill up early and everything is made to order. Leave your name
                    and we will reach out on WhatsApp the moment your festival slot opens.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Field
                    id={nameId}
                    label="Your name"
                    placeholder="Aarti Deshpande"
                    value={name}
                    onChange={setName}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Field
                    id={phoneId}
                    label="WhatsApp number"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={setPhone}
                    error={errors.phone}
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                  />

                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Reserve my slot
                    </Button>
                    <p className="mt-4 text-[0.78rem] leading-relaxed text-cocoa-soft">
                      No spam, no newsletters — one message when your festival batch opens. Bulk and
                      corporate enquiries are welcome here too.
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
        </div>
      </div>
    </section>
  );
}
