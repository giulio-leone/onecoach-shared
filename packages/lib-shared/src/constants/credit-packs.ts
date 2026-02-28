/**
 * Credit pack option (for UI display)
 */
export interface CreditPackOption {
  id: string;
  credits: number;
  price: number;
  currency: string;
  popular?: boolean;
  savings?: string;
}

/**
 * Credit pack pricing (with Stripe price ID)
 */
export interface CreditPackPricing extends CreditPackOption {
  stripePriceId: string;
}

type CreditPackRecord = CreditPackOption & {
  envKey: keyof NodeJS.ProcessEnv;
};

const CREDIT_PACK_RECORDS: CreditPackRecord[] = [
  {
    id: 'credits_100',
    credits: 100,
    price: 4.99,
    currency: 'eur',
    envKey: 'STRIPE_CREDITS_100_PRICE_ID',
  },
  {
    id: 'credits_250',
    credits: 250,
    price: 9.99,
    currency: 'eur',
    popular: true,
    savings: 'Risparmia 10%',
    envKey: 'STRIPE_CREDITS_250_PRICE_ID',
  },
  {
    id: 'credits_500',
    credits: 500,
    price: 17.99,
    currency: 'eur',
    savings: 'Risparmia 15%',
    envKey: 'STRIPE_CREDITS_500_PRICE_ID',
  },
  {
    id: 'credits_1000',
    credits: 1000,
    price: 29.99,
    currency: 'eur',
    savings: 'Risparmia 25%',
    envKey: 'STRIPE_CREDITS_1000_PRICE_ID',
  },
];

/**
 * Catalogo credito per utilizzo lato client (UI)
 */
export const CREDIT_PACK_OPTIONS: CreditPackOption[] = CREDIT_PACK_RECORDS.map(
  ({ envKey, ...pack }) => pack
);

/**
 * Risolve i pacchetti crediti con gli Stripe price ID associati.
 * Da utilizzare esclusivamente lato server.
 */
export function getCreditPackPricing(): CreditPackPricing[] {
  return CREDIT_PACK_RECORDS.map(({ envKey, ...pack }) => ({
    ...pack,
    stripePriceId: process.env[envKey] ?? '',
  }));
}

/**
 * Recupera rapidamente il price ID di Stripe per un dato numero di crediti.
 */
export function getCreditPackPriceId(credits: number): string | null {
  const record = CREDIT_PACK_RECORDS.find((pack: any) => pack.credits === credits);
  if (!record) {
    return null;
  }
  return process.env[record.envKey] ?? null;
}

/**
 * Trova la definizione del pack partendo dai crediti.
 */
export function findCreditPackOption(credits: number): CreditPackOption | undefined {
  return CREDIT_PACK_OPTIONS.find((pack: any) => pack.credits === credits);
}

/**
 * Mappa un Stripe price ID al numero di crediti corrispondente.
 * @param priceId Stripe price ID
 * @returns Numero di crediti o null se non trovato
 */
export function getCreditsFromPriceId(priceId: string): number | null {
  for (const record of CREDIT_PACK_RECORDS) {
    const envPriceId = process.env[record.envKey];
    if (envPriceId === priceId) {
      return record.credits;
    }
  }
  return null;
}
