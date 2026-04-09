import type { UsageStep } from "@/types/usage-steps";

export const USAGE_STEPS: UsageStep[] = [
  {
    id: "prep",
    num: 1,
    keyword: "PREP",
    title: "Prep & cleanse",
    body: "Cleanse and pat dry your face.",
  },
  {
    id: "apply",
    num: 2,
    keyword: "APPLY",
    title: "Apply & massage",
    body: "Apply a small amount. Massage upwards and outwards.",
  },
  {
    id: "absorb",
    num: 3,
    keyword: "ABSORB",
    title: "Absorb & wait",
    body: "Allow the product to absorb fully. (3–5 mins)",
  },
  {
    id: "shine",
    num: 4,
    keyword: "SHINE",
    title: "Shine & enjoy",
    body: "Enjoy your glowing, healthy skin!",
  },
];
