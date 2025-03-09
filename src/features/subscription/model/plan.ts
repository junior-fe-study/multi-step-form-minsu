export type Plan = "arcade" | "advanced" | "pro";

export const PLAN_PRICES: Record<Plan, number> = {
  arcade: 9,
  advanced: 12,
  pro: 15,
};
