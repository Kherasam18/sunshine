'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Occasion } from '@/types';
import { cn } from '@/lib/utils';
import { CustomiseStepBody } from './CustomiseStepBody';
import { CustomiseSummary, type Selection } from './CustomiseSummary';
import { CustomiseSummaryBar } from './CustomiseSummaryBar';
import type { CraftOption } from './types';

export type { CraftOption } from './types';

export function CustomiseBuilder({
  crafts,
  occasions,
}: {
  crafts: CraftOption[];
  occasions: Occasion[];
}) {
  const [craftId, setCraftId] = useState<string>();
  const [productSlug, setProductSlug] = useState<string>();
  const [colour, setColour] = useState<{ name: string; hex: string }>();
  const [fragrance, setFragrance] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const [personalisation, setPersonalisation] = useState('');
  const [occasion, setOccasion] = useState<string>();
  const [requiredBy, setRequiredBy] = useState('');
  const [stepIndex, setStepIndex] = useState(0);
  const reduced = useReducedMotion();

  const craft = crafts.find((item) => item.id === craftId);
  const product = craft?.products.find((item) => item.slug === productSlug);

  /** The fragrance step only exists for pieces that carry a scent. */
  const steps = useMemo(
    () => [
      { id: 'craft', title: 'What would you like made?', helper: 'Four crafts, one studio. Start with the material.' },
      { id: 'product', title: 'Choose your piece', helper: 'Everything here can be changed — this is just the starting shape.' },
      { id: 'colour', title: 'Pick a colour', helper: 'Any shade is possible. These are the ones we pour most often.' },
      ...(product && product.fragrances.length > 0
        ? [{ id: 'fragrance', title: 'Choose a fragrance', helper: 'Or unscented, which most pooja pieces call for.' }]
        : []),
      { id: 'quantity', title: 'How many?', helper: 'Twenty or more unlocks bulk pricing.' },
      { id: 'details', title: 'Anything to personalise?', helper: 'Names, dates, a message, a reference you have seen.' },
      { id: 'occasion', title: 'What is the occasion?', helper: 'It helps us suggest packaging that suits.' },
      { id: 'date', title: 'When do you need it?', helper: 'Handmade work needs about 20 days for bulk orders.' },
    ],
    [product],
  );

  const current = steps[Math.min(stepIndex, steps.length - 1)];
  const next = () => setStepIndex((i) => Math.min(steps.length - 1, i + 1));
  const back = () => setStepIndex((i) => Math.max(0, i - 1));
  const goTo = (id: string) => {
    const index = steps.findIndex((step) => step.id === id);
    if (index >= 0) setStepIndex(index);
  };

  const selection: Selection = {
    craft: craft?.name,
    product: product?.name,
    colour: colour?.name,
    colourHex: colour?.hex,
    fragrance,
    quantity,
    personalisation,
    occasion: occasions.find((item) => item.slug === occasion)?.name,
    requiredBy,
  };

  const answered = [craft, product, colour, fragrance, quantity > 0, personalisation, occasion, requiredBy]
    .filter(Boolean).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
      <div>
        <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-terracotta-deep">
          Step {stepIndex + 1} of {steps.length}
        </p>

        {/* Keyed remount rather than an AnimatePresence swap: the next step must
            never wait on the previous one's exit animation to finish. */}
        <motion.div
          key={current.id}
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.32, ease: [0.21, 0.68, 0.35, 1] }}
        >
          <h2 className="mt-3 font-display text-display-2 font-bold text-terracotta">
            {current.title}
          </h2>
          <p className="mt-2 max-w-lg text-[0.93rem] leading-relaxed text-cocoa-soft">
            {current.helper}
          </p>

          <div className="mt-7">
            <CustomiseStepBody
              stepId={current.id}
              crafts={crafts}
              occasions={occasions}
              craft={craft}
              product={product}
              craftId={craftId}
              productSlug={productSlug}
              colour={colour}
              fragrance={fragrance}
              quantity={quantity}
              personalisation={personalisation}
              occasion={occasion}
              requiredBy={requiredBy}
              onCraft={(value) => {
                setCraftId(value);
                setProductSlug(undefined);
                setColour(undefined);
                setFragrance(undefined);
                next();
              }}
              onProduct={(value) => {
                setProductSlug(value);
                setColour(undefined);
                setFragrance(undefined);
                next();
              }}
              onColour={(value) => {
                setColour(value);
                next();
              }}
              onFragrance={(value) => {
                setFragrance(value);
                next();
              }}
              onQuantity={setQuantity}
              onPersonalisation={setPersonalisation}
              onOccasion={(value) => {
                setOccasion(value);
                next();
              }}
              onRequiredBy={setRequiredBy}
            />
          </div>
        </motion.div>

        <div className="mt-10 flex items-center gap-3 pb-28 lg:pb-0">
          <button
            type="button"
            onClick={back}
            disabled={stepIndex === 0}
            className={cn(
              'inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 font-sans text-[0.88rem] font-medium transition',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta',
              stepIndex === 0
                ? 'cursor-not-allowed text-cocoa-soft/40'
                : 'text-cocoa-soft hover:text-terracotta-deep',
            )}
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back
          </button>

          {stepIndex < steps.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-terracotta/35 bg-ivory px-5 font-sans text-[0.88rem] font-medium text-terracotta-deep transition hover:border-terracotta hover:bg-terracotta/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              Skip this step
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
        <CustomiseSummary
          selection={selection}
          onJumpTo={goTo}
          complete={Boolean(craft && product)}
          progress={answered / 8}
        />
      </div>

      <CustomiseSummaryBar
        selection={selection}
        onJumpTo={goTo}
        complete={Boolean(craft && product)}
        progress={answered / 8}
      />
    </div>
  );
}
