import type { FormValues, Contribution, ResultData } from '../types';

/**
 * Plausible input ranges, derived from the 1st and 99th percentile of the raw
 * values in the underlying cohort. Values outside these bounds are clamped to
 * the limit before entering the model.
 */
export const INPUT_LIMITS = {
  tryptase: { min: 1.9, max: 793.8 },
  ige: { min: 1.5, max: 7626 },
  b12: { min: 190, max: 6000 },
  organs: { min: 0, max: 8 },
} as const;

export type LimitedField = keyof typeof INPUT_LIMITS;

/** Parse a form value and clamp it into the observed range of the cohort. */
export function clampValue(raw: string, field: LimitedField): number {
  const n = field === 'organs' ? parseInt(raw) : parseFloat(raw);
  if (isNaN(n)) return 0;
  const { min, max } = INPUT_LIMITS[field];
  return Math.min(Math.max(n, min), max);
}

/** True when a filled-in value lies outside the observed range. */
export function isOutOfRange(raw: string, field: LimitedField): boolean {
  if (raw === '') return false;
  const n = field === 'organs' ? parseInt(raw) : parseFloat(raw);
  if (isNaN(n)) return false;
  const { min, max } = INPUT_LIMITS[field];
  return n < min || n > max;
}

/**
 * Real EDS coefficients from the published logistic regression model (Table 2).
 * Linear predictor: η = w₀ + Σ wⱼ × xⱼ
 * Probability: P(EDS) = 1 / (1 + e^(−η))
 */
export function computeScore(values: FormValues): number {
  const tryptase = clampValue(values.tryptase, 'tryptase');
  const ige = clampValue(values.ige, 'ige');
  const b12 = clampValue(values.b12, 'b12');
  const organs = clampValue(values.organs, 'organs');
  const splen = values.splen === 'yes' ? 1 : 0;
  const ent = values.ent === 'yes' ? 1 : 0;

  // Coefficients from Table 2
  const w_tryptase = 0.1256006;
  const w_b12      = 0.0031325;
  const w_ige      = -0.0030064;
  const w_organs   = -0.7769450;
  const w_splen    = 2.2903299;
  const w_ent      = -1.3023130;
  const w0         = -1.658558386;

  const eta = w_tryptase * tryptase
          + w_b12      * b12
          + w_ige      * ige
          + w_organs   * organs
          + w_splen    * splen
          + w_ent      * ent
          + w0;

  return 1 / (1 + Math.exp(-eta));
}

/**
 * Compute individual variable contributions.
 * contribution_j = (wⱼ × xⱼ) / Σ|wⱼ × xⱼ| × 100
 * Positive → clonal direction, negative → non-clonal direction.
 */
export function computeContributions(values: FormValues): Contribution[] {
  const tryptase = clampValue(values.tryptase, 'tryptase');
  const ige = clampValue(values.ige, 'ige');
  const b12 = clampValue(values.b12, 'b12');
  const organs = clampValue(values.organs, 'organs');
  const splen = values.splen;
  const ent = values.ent;

  const raw = [
    { name: 'Serum tryptase',           val:  0.1256006 * tryptase },
    { name: 'Immunoglobulin E',   val: -0.0030064 * ige },
    { name: 'Vitamin B12',        val:  0.0031325 * b12 },
    { name: 'N° of involved organs', val: -0.7769450 * organs },
    { name: 'Splenomegaly',       val:  splen === 'yes' ? 2.2903299 : 0 },
    { name: 'ENT / Asthma',       val:  ent === 'yes' ? -1.3023130 : 0 },
  ];

  const total = raw.reduce((sum, r) => sum + Math.abs(r.val), 0);
  if (total === 0) return raw.map(r => ({ name: r.name, pct: 0 }));

  return raw.map(r => ({
    name: r.name,
    pct: Math.round((r.val / total) * 100),
  }));
}

/**
 * Generate full result data from form values.
 */
export function calculateResult(values: FormValues): ResultData | null {
  // Validate all fields are filled
  if (isNaN(parseFloat(values.tryptase)) || values.tryptase === '') return null;
  if (isNaN(parseFloat(values.ige)) || values.ige === '') return null;
  if (isNaN(parseFloat(values.b12)) || values.b12 === '') return null;
  if (isNaN(parseInt(values.organs)) || values.organs === '') return null;
  if (!values.splen) return null;
  if (!values.ent) return null;

  return {
    probability: computeScore(values),
    contributions: computeContributions(values),
  };
}
