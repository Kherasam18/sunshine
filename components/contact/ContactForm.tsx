'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, MessageCircle, Send } from 'lucide-react';
import { contactFormLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { TextAreaField } from '@/components/ui/SelectField';

/**
 * General enquiry form. Front-end only — submitting shows the success state,
 * and the WhatsApp fallback carries the same message to a real inbox.
 */
export function ContactForm() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Please tell us your name.';
    if (whatsapp.replace(/\D/g, '').length < 10) next.whatsapp = 'Please enter a 10-digit number.';
    if (message.trim().length < 10) next.message = 'A sentence or two is plenty.';
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  return (
    <div className="rounded-[2rem] bg-ivory p-6 shadow-warm ring-1 ring-gold/30 sm:p-8">
      {submitted ? (
          <motion.div
            key="success"
            role="status"
            aria-live="polite"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.21, 0.68, 0.35, 1] }}
            className="flex flex-col items-center py-6 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sun/20 text-terracotta-deep ring-1 ring-inset ring-sun/40">
              <Check aria-hidden="true" className="h-8 w-8" strokeWidth={2.2} />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-terracotta sm:text-3xl">
              Message received{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}.
            </h3>
            <p className="mt-4 max-w-md text-body-sm leading-relaxed text-cocoa-soft">
              We will reply on WhatsApp, usually the same day. If it is urgent, message us directly —
              that reaches the studio fastest.
            </p>
            <Button
              href={contactFormLink({ name, message })}
              external
              className="mt-7"
              icon={<MessageCircle className="h-[18px] w-[18px]" />}
            >
              Continue on WhatsApp
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <h2 className="font-display text-display-3 font-semibold text-terracotta">
              Send us a note
            </h2>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-cocoa-soft">
              Orders, questions, or an idea you would like made — it all arrives in the same place.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field
                id="contact-name"
                label="Your name"
                placeholder="Aarti Deshpande"
                value={name}
                onChange={setName}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="contact-whatsapp"
                label="WhatsApp number"
                placeholder="98765 43210"
                value={whatsapp}
                onChange={setWhatsapp}
                error={errors.whatsapp}
                type="tel"
                autoComplete="tel"
                inputMode="numeric"
              />
              <TextAreaField
                id="contact-message"
                label="Your message"
                placeholder="I am looking for 50 return gifts for a wedding in December…"
                value={message}
                onChange={setMessage}
                error={errors.message}
                rows={5}
                className="sm:col-span-2"
              />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" size="lg" className="w-full sm:w-auto" icon={<Send className="h-[18px] w-[18px]" />}>
                Send message
              </Button>
              <Button
                href={contactFormLink({ name, message })}
                external
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                icon={<MessageCircle className="h-[18px] w-[18px]" />}
              >
                Send on WhatsApp instead
              </Button>
            </div>
          </motion.form>
        )}
    </div>
  );
}
