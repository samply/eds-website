import type { FormValues, Contribution, ResultData, CardiacResult, CardiacScore, CardiacRisk } from '../types';

/**
 * Compute the EDS probability using a placeholder logistic regression formula.
 * NOTE: Replace this function with the real EDS formula when available.
 */
export function computeScore(values: FormValues): number {
  const tryptase = parseFloat(values.tryptase) || 0;
  const ige = parseFloat(values.ige) || 0;
  const ldh = parseFloat(values.ldh) || 0;
  const b12 = parseFloat(values.b12) || 0;
  const organs = parseInt(values.organs) || 0;
  const splen = values.splen === 'yes' ? 1 : 0;
  const ent = values.ent === 'yes' ? 1 : 0;

  // Placeholder logistic regression (coefficients are illustrative)
  let eta = -3.5;
  eta += 0.07 * Math.min(tryptase, 100);
  eta -= 0.002 * Math.min(ige, 3000);
  eta += 0.004 * Math.min(ldh, 1000);
  eta += 0.002 * Math.min(b12, 2000);
  eta += 0.30 * organs;
  eta += 1.2 * splen;
  eta -= 0.8 * ent;

  return 1 / (1 + Math.exp(-eta));
}

/**
 * Compute individual variable contributions (illustrative weights).
 */
export function computeContributions(values: FormValues): Contribution[] {
  const tryptase = parseFloat(values.tryptase) || 0;
  const ige = parseFloat(values.ige) || 0;
  const ldh = parseFloat(values.ldh) || 0;
  const b12 = parseFloat(values.b12) || 0;
  const organs = parseInt(values.organs) || 0;
  const splen = values.splen;
  const ent = values.ent;

  return [
    { name: 'Tryptase', pct: Math.round(0.07 * Math.min(tryptase, 100) * 10) },
    { name: 'Immunoglobulin E', pct: -Math.round(0.002 * Math.min(ige, 3000) * 10) },
    { name: 'LDH', pct: Math.round(0.004 * Math.min(ldh, 1000) * 10) },
    { name: 'Vitamin B12', pct: Math.round(0.002 * Math.min(b12, 2000) * 10) },
    { name: 'Involved organs', pct: Math.round(0.30 * organs * 10) },
    { name: 'Splenomegaly', pct: splen === 'yes' ? 12 : 0 },
    { name: 'ENT / Asthma', pct: ent === 'yes' ? -8 : 0 },
  ];
}

/**
 * Generate full result data from form values.
 */
export function calculateResult(values: FormValues): ResultData | null {
  // Validate all fields are filled
  if (isNaN(parseFloat(values.tryptase)) || values.tryptase === '') return null;
  if (isNaN(parseFloat(values.ige)) || values.ige === '') return null;
  if (isNaN(parseFloat(values.ldh)) || values.ldh === '') return null;
  if (isNaN(parseFloat(values.b12)) || values.b12 === '') return null;
  if (isNaN(parseInt(values.organs)) || values.organs === '') return null;
  if (!values.splen) return null;
  if (!values.ent) return null;

  const probability = computeScore(values);
  const pct = Math.round(probability * 100);
  const contributions = computeContributions(values);

  if (pct >= 73) {
    return {
      probability,
      level: 'Likely clonal',
      levelClass: 'high',
      description:
        'Based on the Eosinophilia Differentiation Score (EDS), a <strong>clonal cause</strong> of eosinophilia is likely (probability ≥ 73%).',
      recommendation: 'Genetic testing is recommended.',
      contributions,
    };
  }
  return {
    probability,
    level: 'Unlikely clonal',
    levelClass: 'low',
    description:
      'Based on the Eosinophilia Differentiation Score (EDS), a clonal cause of eosinophilia is <strong>unlikely</strong> — a non-clonal etiology is more probable.',
    recommendation: 'Non-clonal causes should be considered and further investigated clinically.',
    contributions,
  };
}

/**
 * Compute cardiac risk score.
 */
export function computeCardiacRisk(
  trop: number,
  bnp: number,
  lge: string
): CardiacResult {
  let score: CardiacScore = 0;
  const details: string[] = [];

  if (trop >= 0.045) {
    score = ((score + 1) as CardiacScore);
    details.push('hs-Troponin I ≥ 0.045 µg/L: +1');
  }
  if (bnp >= 125) {
    score = ((score + 1) as CardiacScore);
    details.push('NT-proBNP ≥ 125 ng/L: +1');
  }
  if (lge === 'yes') {
    score = ((score + 3) as CardiacScore);
    details.push('LGE positive: +3');
  }

  let risk: CardiacRisk;
  if (score === 0) risk = 'low';
  else if (score <= 3) risk = 'intermediate';
  else risk = 'high';

  return { score, risk, details };
}

/**
 * Get the recommendation text for a cardiac risk level.
 */
export function getCardiacRecommendation(risk: CardiacRisk): string {
  switch (risk) {
    case 'low':
      return 'Routine cardiac follow-up is recommended. No immediate intensification of therapy required based on cardiac risk score alone.';
    case 'intermediate':
      return 'Closer cardiological monitoring is recommended. Reassess need for therapy intensification based on full clinical picture.';
    case 'high':
      return 'Intensified cardiological monitoring is strongly recommended. Therapy escalation should be considered promptly to prevent further eosinophil-mediated cardiac damage.';
    default:
      return '';
  }
}
