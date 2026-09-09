'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, MessageCircle, Send } from 'lucide-react';
import { bulkFormLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { SelectField } from '@/components/ui/SelectField';

interface FormState {
  name: string;
  company: string;
  product: string;
  quantity: string;
  requiredBy: string;
  budget: string;
  whatsapp: string;
}

const empty: FormState = {
  name: '',
  company: '',
  product: '',
  quantity: '',
  requiredBy: '',
  budget: '',
  whatsapp: '',
};

/**
 * Bulk quote request. Front-end only for this build — submitting shows the
 * success state. The WhatsApp fallback composes the same answers into a
 * message, so a lead is never lost to a form that goes nowhere.
 */
export function BulkEnquiryForm({
  productOptions,
  quantityBands,
  budgetBands,
}: {
  productOptions: string[];
  quantityBands: string[];
  budgetBands: string[];
}) {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!form.product) next.product = 'Which piece are you interested in?';
    if (!form.quantity) next.quantity = 'Roughly how many do you need?';
    if (!form.requiredBy) next.requiredBy = 'When do you need them by?';
    if (form.whatsapp.replace(/\D/g, '').length < 10) {
      next.whatsapp = 'Please enter a 10-digit WhatsApp number.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  return (
    <div className="rounded-[2rem] bg-ivory p-6 shadow-lift ring-1 ring-gold/30 sm:p-9">
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
            <h3 className="mt-6 font-display text-3xl font-bold text-terracotta">
              Thank you{form.name.trim() ? `, ${form.name.trim().split(' ')[0]}` : ''}.
            </h3>
            <p className="mt-4 max-w-lg text-body-sm leading-relaxed text-cocoa-soft">
              Your enquiry is with us. We will come back on WhatsApp within a day with pricing,
              what is possible in your timeline, and a couple of options you may not have thought
              of. For anything urgent, message us directly — it is the fastest way to reach the
              studio.
            </p>
            <Button
              href={bulkFormLink(form)}
              external
              size="lg"
              className="mt-8"
              icon={<MessageCircle className="h-[18px] w-[18px]" />}
            >
              Continue on WhatsApp
            </Button>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setForm(empty);
              }}
              className="mt-5 rounded-sm text-[0.82rem] font-medium text-cocoa-soft underline underline-offset-4 transition hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            transition={{ duration: 0.3 }}
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              if (validate()) setSubmitted(true);
            }}
          >
            <h3 className="font-display text-display-3 font-semibold text-terracotta">
              Tell us what you need
            </h3>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-cocoa-soft">
              The more you can share, the more useful our first reply will be. Nothing here is
              binding — it just saves a round of questions.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Field
                id="bulk-name"
                label="Your name"
                placeholder="Aarti Deshpande"
                value={form.name}
                onChange={(v) => set('name', v)}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="bulk-company"
                label="Company or event (optional)"
                placeholder="Acme Pvt Ltd · Sharma wedding"
                value={form.company}
                onChange={(v) => set('company', v)}
                autoComplete="organization"
              />
              <SelectField
                id="bulk-product"
                label="Product interest"
                value={form.product}
                onChange={(v) => set('product', v)}
                options={productOptions}
                error={errors.product}
                placeholder="Choose a piece or range…"
              />
              <SelectField
                id="bulk-quantity"
                label="Quantity"
                value={form.quantity}
                onChange={(v) => set('quantity', v)}
                options={quantityBands}
                error={errors.quantity}
                placeholder="How many pieces?"
              />
              <Field
                id="bulk-date"
                label="Required by"
                placeholder="Select a date"
                value={form.requiredBy}
                onChange={(v) => set('requiredBy', v)}
                error={errors.requiredBy}
                type="date"
              />
              <SelectField
                id="bulk-budget"
                label="Budget (optional)"
                value={form.budget}
                onChange={(v) => set('budget', v)}
                options={budgetBands}
                placeholder="Rough range…"
              />
              <Field
                id="bulk-whatsapp"
                label="WhatsApp number"
                placeholder="98765 43210"
                value={form.whatsapp}
                onChange={(v) => set('whatsapp', v)}
                error={errors.whatsapp}
                type="tel"
                autoComplete="tel"
                inputMode="numeric"
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" size="lg" className="w-full sm:w-auto" icon={<Send className="h-[18px] w-[18px]" />}>
                Request a quote
              </Button>
              <Button
                href={bulkFormLink(form)}
                external
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                icon={<MessageCircle className="h-[18px] w-[18px]" />}
              >
                Send this on WhatsApp instead
              </Button>
            </div>

            <p className="mt-5 text-[0.78rem] leading-relaxed text-cocoa-soft">
              We reply to every enquiry personally, usually the same day. Bulk orders need
              20 days from confirmation — festive seasons fill up sooner.
            </p>
          </motion.form>
        )}
    </div>
  );
}
