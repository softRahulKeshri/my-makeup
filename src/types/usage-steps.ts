export type UsageStep = {
  id: string;
  num: number;
  /** Large gold display word (PREP, APPLY, …) */
  keyword: string;
  /** Short heading */
  title: string;
  /** Instruction line */
  body: string;
};
