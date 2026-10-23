import type { ComponentProps } from "react";

export function SpinnerIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="12" strokeOpacity={0.3} />
      <path d="M28 16A12 12 0 0 0 16 4" />
    </svg>
  );
}
