import type { Dispatch, SetStateAction } from 'react';

export type ToggleValue = 'yes' | 'no' | null;

export interface FormValues {
  tryptase: string;
  ige: string;
  b12: string;
  organs: string;
  splen: ToggleValue;
  ent: ToggleValue;
}

export interface Contribution {
  name: string;
  pct: number;
}

export interface ResultData {
  probability: number;
  contributions: Contribution[];
}

export const DEFAULT_FORM_VALUES: FormValues = {
  tryptase: '',
  ige: '',
  b12: '',
  organs: '',
  splen: null,
  ent: null,
};

/** Score form state, owned by the root layout and handed to the score page via the outlet. */
export interface ScoreContext {
  values: FormValues;
  setValues: Dispatch<SetStateAction<FormValues>>;
}
