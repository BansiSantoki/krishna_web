import React from 'react';
import { XIcon } from 'lucide-react';
import { categories } from '../../data/categories';
import { formatINR } from '../../utils/pricing';
import { cn } from '../../utils/cn';

export interface FilterState {
  category: string[];
  metal: string[];
  purity: string[];
  occasion: string[];
  gender: string[];
  stone: string[];
  availability: string[];
  offers: boolean;
  maxPrice: number;
  maxWeight: number;
}

export const PRICE_CEILING = 1500000;
export const WEIGHT_CEILING = 130;

export const emptyFilters: FilterState = {
  category: [],
  metal: [],
  purity: [],
  occasion: [],
  gender: [],
  stone: [],
  availability: [],
  offers: false,
  maxPrice: PRICE_CEILING,
  maxWeight: WEIGHT_CEILING
};

export const metalOptions = [
{ label: '22K Gold', value: 'gold22' },
{ label: '24K Gold', value: 'gold24' },
{ label: '18K Gold', value: 'gold18' },
{ label: 'Silver', value: 'silver' },
{ label: 'Platinum', value: 'platinum' }];


export const occasionOptions = ['Wedding', 'Reception', 'Engagement', 'Festival', 'Party', 'Daily', 'Office', 'Gifting', 'Investment'];
export const genderOptions = [
{ label: 'Women', value: 'women' },
{ label: 'Men', value: 'men' },
{ label: 'Kids', value: 'kids' },
{ label: 'Unisex', value: 'unisex' }];

export const stoneOptions = ['With stones', 'Plain metal'];
export const availabilityOptions = ['In stock', 'Made to order'];

interface FilterPanelProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onClear: () => void;
  resultCount: number;
}

export function FilterPanel({ value, onChange, onClear, resultCount }: FilterPanelProps) {
  const toggle = (key: keyof FilterState, entry: string) => {
    const list = value[key] as string[];
    onChange({
      ...value,
      [key]: list.includes(entry) ? list.filter((item) => item !== entry) : [...list, entry]
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-ink/10 pb-4">
        <p className="eyebrow text-ink-muted">{resultCount} pieces</p>
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1 text-[11px] uppercase tracking-luxe text-gold-deep hover:underline">
          
          <XIcon className="h-3 w-3" /> Clear all
        </button>
      </div>

      <Group title="Price">
        <input
          type="range"
          min={20000}
          max={PRICE_CEILING}
          step={10000}
          value={value.maxPrice}
          onChange={(event) => onChange({ ...value, maxPrice: Number(event.target.value) })}
          aria-label="Maximum price"
          className="w-full accent-gold" />
        
        <p className="mt-2 text-xs text-ink-muted">Up to {formatINR(value.maxPrice)}</p>
      </Group>

      <Group title="Category">
        <ul className="space-y-2">
          {categories.map((category) =>
          <li key={category.slug}>
              <Check
              label={category.name}
              checked={value.category.includes(category.slug)}
              onChange={() => toggle('category', category.slug)} />
            
            </li>
          )}
        </ul>
      </Group>

      <Group title="Metal & purity">
        <ul className="space-y-2">
          {metalOptions.map((option) =>
          <li key={option.value}>
              <Check
              label={option.label}
              checked={value.metal.includes(option.value)}
              onChange={() => toggle('metal', option.value)} />
            
            </li>
          )}
        </ul>
      </Group>

      <Group title="Weight">
        <input
          type="range"
          min={1}
          max={WEIGHT_CEILING}
          step={1}
          value={value.maxWeight}
          onChange={(event) => onChange({ ...value, maxWeight: Number(event.target.value) })}
          aria-label="Maximum weight in grams"
          className="w-full accent-gold" />
        
        <p className="mt-2 text-xs text-ink-muted">Up to {value.maxWeight} g</p>
      </Group>

      <Group title="Occasion">
        <div className="flex flex-wrap gap-2">
          {occasionOptions.map((option) =>
          <Chip
            key={option}
            label={option}
            active={value.occasion.includes(option)}
            onClick={() => toggle('occasion', option)} />

          )}
        </div>
      </Group>

      <Group title="Gender">
        <div className="flex flex-wrap gap-2">
          {genderOptions.map((option) =>
          <Chip
            key={option.value}
            label={option.label}
            active={value.gender.includes(option.value)}
            onClick={() => toggle('gender', option.value)} />

          )}
        </div>
      </Group>

      <Group title="Stone">
        <div className="flex flex-wrap gap-2">
          {stoneOptions.map((option) =>
          <Chip
            key={option}
            label={option}
            active={value.stone.includes(option)}
            onClick={() => toggle('stone', option)} />

          )}
        </div>
      </Group>

      <Group title="Availability">
        <div className="flex flex-wrap gap-2">
          {availabilityOptions.map((option) =>
          <Chip
            key={option}
            label={option}
            active={value.availability.includes(option)}
            onClick={() => toggle('availability', option)} />

          )}
        </div>
      </Group>

      <Group title="Offers">
        <Check
          label="Discounted pieces only"
          checked={value.offers}
          onChange={() => onChange({ ...value, offers: !value.offers })} />
        
      </Group>
    </div>);

}

function Group({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <section>
      <h3 className="eyebrow mb-4 text-ink">{title}</h3>
      {children}
    </section>);

}

function Check({ label, checked, onChange }: {label: string;checked: boolean;onChange: () => void;}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-ink-muted transition-colors hover:text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-gold" />
      {label}
    </label>);

}

function Chip({ label, active, onClick }: {label: string;active: boolean;onClick: () => void;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'border px-3 py-1.5 text-xs transition-colors',
        active ? 'border-gold bg-gold text-ink' : 'border-ink/15 text-ink-muted hover:border-gold hover:text-ink'
      )}>
      
      {label}
    </button>);

}