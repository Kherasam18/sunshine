'use client';

import type { Occasion, Product } from '@/types';
import { Field } from '@/components/ui/Field';
import { TextAreaField } from '@/components/ui/SelectField';
import { OptionChips, OptionGrid, type Option } from './OptionGrid';
import type { CraftOption } from './types';

const quantityPresets = ['1', '5', '10', '20', '50', '100'];

export interface StepBodyProps {
  stepId: string;
  crafts: CraftOption[];
  occasions: Occasion[];
  craft?: CraftOption;
  product?: Product;
  craftId?: string;
  productSlug?: string;
  colour?: { name: string; hex: string };
  fragrance?: string;
  quantity: number;
  personalisation: string;
  occasion?: string;
  requiredBy: string;
  onCraft: (value: string) => void;
  onProduct: (value: string) => void;
  onColour: (value: { name: string; hex: string }) => void;
  onFragrance: (value: string) => void;
  onQuantity: (value: number) => void;
  onPersonalisation: (value: string) => void;
  onOccasion: (value: string) => void;
  onRequiredBy: (value: string) => void;
}

/** Renders the control for whichever step is active. */
export function CustomiseStepBody(props: StepBodyProps) {
  const { stepId } = props;

  if (stepId === 'craft') {
    return (
      <OptionGrid
        name="Craft"
        value={props.craftId}
        columns={2}
        options={props.crafts.map((item) => ({
          value: item.id,
          label: item.name,
          description: item.tagline,
        }))}
        onSelect={(option) => props.onCraft(option.value)}
      />
    );
  }

  if (stepId === 'product') {
    return (
      <OptionGrid
        name="Piece"
        value={props.productSlug}
        columns={2}
        options={(props.craft?.products ?? []).map((item) => ({
          value: item.slug,
          label: item.name,
          description: `${item.priceLabel} · ${item.shortDescription}`,
        }))}
        onSelect={(option) => props.onProduct(option.value)}
      />
    );
  }

  if (stepId === 'colour') {
    return (
      <OptionGrid
        name="Colour"
        value={props.colour?.name}
        columns={3}
        options={(props.product?.colours ?? []).map((item) => ({
          value: item.name,
          label: item.name,
          hex: item.hex,
        }))}
        onSelect={(option: Option) =>
          props.onColour({ name: option.value, hex: option.hex ?? '#F4922B' })
        }
      />
    );
  }

  if (stepId === 'fragrance') {
    return (
      <OptionChips
        name="Fragrance"
        value={props.fragrance}
        options={(props.product?.fragrances ?? []).map((item) => ({ value: item, label: item }))}
        onSelect={(option) => props.onFragrance(option.value)}
      />
    );
  }

  if (stepId === 'quantity') {
    return (
      <div>
        <OptionChips
          name="Quantity"
          value={String(props.quantity)}
          options={quantityPresets.map((item) => ({
            value: item,
            label: item === '100' ? '100+' : item,
          }))}
          onSelect={(option) => props.onQuantity(Number(option.value))}
        />
        <div className="mt-5 max-w-[200px]">
          <Field
            id="customise-quantity"
            label="Or type an exact number"
            placeholder="45"
            value={String(props.quantity)}
            onChange={(value) => props.onQuantity(Math.max(1, Number(value) || 1))}
            inputMode="numeric"
          />
        </div>
        {props.quantity >= 20 ? (
          <p className="mt-4 rounded-2xl bg-sun/10 px-4 py-3 text-[0.85rem] text-cocoa">
            Nice — {props.quantity} pieces qualifies for bulk pricing.
          </p>
        ) : null}
      </div>
    );
  }

  if (stepId === 'details') {
    return (
      <TextAreaField
        id="customise-details"
        label="Personalisation & notes"
        placeholder="Names and a date to add, a colour you have seen, packaging you had in mind…"
        hint="Optional — but the more you tell us, the closer the first attempt lands."
        rows={5}
        value={props.personalisation}
        onChange={props.onPersonalisation}
      />
    );
  }

  if (stepId === 'occasion') {
    return (
      <OptionGrid
        name="Occasion"
        value={props.occasion}
        columns={2}
        options={props.occasions.map((item) => ({
          value: item.slug,
          label: item.name,
          description: item.tagline,
        }))}
        onSelect={(option) => props.onOccasion(option.value)}
      />
    );
  }

  if (stepId === 'date') {
    return (
      <div className="max-w-xs">
        <Field
          id="customise-date"
          label="Required by"
          placeholder="Select a date"
          type="date"
          value={props.requiredBy}
          onChange={props.onRequiredBy}
        />
      </div>
    );
  }

  return null;
}
