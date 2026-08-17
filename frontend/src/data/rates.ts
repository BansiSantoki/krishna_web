import type { MetalKey } from '../types';

export const GST_RATE = 0.03;

/** Rate per gram, in INR. */
export const METAL_RATES: Record<MetalKey, number> = {
  gold24: 7462,
  gold22: 6842,
  gold18: 5601,
  silver: 94,
  platinum: 3180
};

export interface RateCard {
  key: MetalKey;
  label: string;
  sublabel: string;
  rate: number;
  change: number;
}

export const RATE_CARDS: RateCard[] = [
{ key: 'gold24', label: '24K Gold', sublabel: '999 Fine · per gram', rate: METAL_RATES.gold24, change: 0.42 },
{ key: 'gold22', label: '22K Gold', sublabel: '916 Hallmark · per gram', rate: METAL_RATES.gold22, change: 0.38 },
{ key: 'gold18', label: '18K Gold', sublabel: '750 Hallmark · per gram', rate: METAL_RATES.gold18, change: -0.16 },
{ key: 'silver', label: 'Silver', sublabel: '999 Fine · per gram', rate: METAL_RATES.silver, change: 1.12 },
{ key: 'platinum', label: 'Platinum', sublabel: '950 Pt · per gram', rate: METAL_RATES.platinum, change: -0.24 }];


/** Last 30 sessions of 22K gold, oldest first. */
export const GOLD_HISTORY: Array<{day: string;gold22: number;gold24: number;silver: number;}> = [
{ day: '07 Jul', gold22: 6612, gold24: 7212, silver: 88 },
{ day: '08 Jul', gold22: 6628, gold24: 7229, silver: 88 },
{ day: '09 Jul', gold22: 6605, gold24: 7204, silver: 87 },
{ day: '10 Jul', gold22: 6641, gold24: 7244, silver: 89 },
{ day: '11 Jul', gold22: 6670, gold24: 7276, silver: 89 },
{ day: '12 Jul', gold22: 6684, gold24: 7291, silver: 90 },
{ day: '15 Jul', gold22: 6659, gold24: 7264, silver: 89 },
{ day: '16 Jul', gold22: 6702, gold24: 7311, silver: 90 },
{ day: '17 Jul', gold22: 6733, gold24: 7345, silver: 91 },
{ day: '18 Jul', gold22: 6718, gold24: 7328, silver: 90 },
{ day: '19 Jul', gold22: 6745, gold24: 7358, silver: 91 },
{ day: '22 Jul', gold22: 6771, gold24: 7386, silver: 92 },
{ day: '23 Jul', gold22: 6759, gold24: 7373, silver: 91 },
{ day: '24 Jul', gold22: 6788, gold24: 7405, silver: 92 },
{ day: '25 Jul', gold22: 6802, gold24: 7420, silver: 93 },
{ day: '26 Jul', gold22: 6790, gold24: 7407, silver: 92 },
{ day: '29 Jul', gold22: 6815, gold24: 7434, silver: 93 },
{ day: '30 Jul', gold22: 6831, gold24: 7452, silver: 93 },
{ day: '31 Jul', gold22: 6809, gold24: 7428, silver: 92 },
{ day: '01 Aug', gold22: 6824, gold24: 7444, silver: 93 },
{ day: '02 Aug', gold22: 6838, gold24: 7459, silver: 94 },
{ day: '05 Aug', gold22: 6842, gold24: 7462, silver: 94 }];


export const RATE_UPDATED_AT = 'Today, 09:30 AM IST';