export type ProductJarShowcaseProps = {
  /** Tailwind width classes for the wrapper, e.g. `w-[min(72vw,300px)]` */
  widthClassName: string;
  sizes?: string;
  priority?: boolean;
  alt?: string;
  /** 3D tilt on pointer move (disable in pinned scroll sections). Default true. */
  interactive?: boolean;
};
