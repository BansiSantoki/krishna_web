import type { MetalKey, PriceBreakup, Product } from '../types';
import { METAL_RATES, GST_RATE } from '../data/rates';

export function rateFor(metal: MetalKey): number {
  return METAL_RATES[metal];
}

export function priceBreakup(product: Product): PriceBreakup {
  const metalValue = Math.round(rateFor(product.metal) * product.weight);
  const stoneValue = Math.round(product.stoneValue);
  const making = Math.round(metalValue * product.makingPct / 100);
  const subtotal = metalValue + stoneValue + making;
  const gst = Math.round(subtotal * GST_RATE);
  const mrp = subtotal + gst;
  const savings = Math.round(mrp * product.discountPct / 100);
  return {
    metalValue,
    stoneValue,
    making,
    gst,
    subtotal,
    mrp,
    savings,
    total: mrp - savings
  };
}

export function productPrice(product: Product): number {
  return priceBreakup(product).total;
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

export function formatINR(value: number): string {
  return inr.format(Math.round(value));
}

export function formatGrams(value?: number | null): string {
  if (value == null || Number.isNaN(value)) return '—';
  return `${Number(value).toFixed(3)} g`;
}

export function emiPerMonth(total: number, months = 12): number {
  return Math.round(total / months);
}