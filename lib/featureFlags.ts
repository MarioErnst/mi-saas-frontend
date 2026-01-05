// lib/featureFlags.ts
export const FEATURE_FLAGS = {
  // Habilita "Claude Haiku 4.5" para todos los clientes
  claudeHaiku: true,
} as const;

export type FeatureFlags = typeof FEATURE_FLAGS;

export default FEATURE_FLAGS;
