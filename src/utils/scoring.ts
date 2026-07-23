import type { FormValues, Contribution, ResultData, CardiacResult, CardiacScore, CardiacRisk } from '../types';

/**
 * Real EDS coefficients from the published logistic regression model (Table 1).
 * Linear predictor: η = (Σ wⱼ × xⱼ) − w₀
 * Probability: P(EDS) = 1 / (1 + e^(−η))
 */
export function computeScore(values: FormValues): number {
  const tryptase = parseFloat(values.tryptase) || 0;
  const ige = parseFloat(values.ige) || 0;
  const ldh = parseFloat(values.ldh) || 0;
  const b12 = parseFloat(values.b12) || 0;
  const organs = parseInt(values.organs) || 0;
  const splen = values.splen === 'yes' ? 1 : 0;
  const ent = values.ent === 'yes' ? 1 : 0;

  // Coefficients from Table 1
  const w_tryptase = 0.125516906;
  const w_b12      = 0.003489235;
  const w_ldh      = -0.002178421;
  const w_ige      = -0.002612035;
  const w_organs   = -0.860808755;
  const w_splen    = 2.855350231;
  const w_ent      = -1.388400077;
  const w0         = -1.34034;

  const eta = w_tryptase * tryptase
          + w_b12      * b12
          + w_ldh      * ldh
          + w_ige      * ige
          + w_organs   * organs
          + w_splen    * splen
          + w_ent      * ent
          - w0;

  return 1 / (1 + Math.exp(-eta));
}

/**
 * Compute individual variable contributions.
 * contribution_j = (wⱼ × xⱼ) / Σ|wⱼ × xⱼ| × 100
 * Positive → clonal direction, negative → non-clonal direction.
 */
export function computeContributions(values: FormValues): Contribution[] {
  const tryptase = parseFloat(values.tryptase) || 0;
  const ige = parseFloat(values.ige) || 0;
  const ldh = parseFloat(values.ldh) || 0;
  const b12 = parseFloat(values.b12) || 0;
  const organs = parseInt(values.organs) || 0;
  const splen = values.splen;
  const ent = values.ent;

  const raw = [
    { name: 'Serum tryptase',           val:  0.125516906 * tryptase },
    { name: 'Immunoglobulin E',   val: -0.002612035 * ige },
    { name: 'LDH',                val: -0.002178421 * ldh },
    { name: 'Vitamin B12',        val:  0.003489235 * b12 },
    { name: 'Involved organs',    val: -0.860808755 * organs },
    { name: 'Splenomegaly',       val:  splen === 'yes' ? 2.855350231 : 0 },
    { name: 'ENT / Asthma',       val:  ent === 'yes' ? -1.388400077 : 0 },
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
