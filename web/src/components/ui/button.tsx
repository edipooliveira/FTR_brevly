import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { SpinnerIcon } from "../icons/spinner";

const buttonVariants = tv({
  base: "flex items-center justify-center font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none focus-visible:outline-none",

  variants: {
    variant: {
      primary:
        "h-12 w-full px-5 gap-3 rounded-lg bg-blue-base text-md text-white hover:bg-blue-dark focus-visible:bg-blue-dark",
      secondary:
        "relative h-8 px-2 gap-1.5 rounded after:absolute after:inset-x-0 after:-inset-y-1.5 border border-transparent bg-gray-200 text-sm text-gray-500 hover:border-blue-base focus-visible:border-blue-base [&_svg]:size-4 [&_svg]:text-gray-600",
    },
    isLoading: {
      true: "opacity-50 pointer-events-none",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  variant,
  isLoading,
  className,
  asChild,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={buttonVariants({ variant, isLoading, className })}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && !asChild && <SpinnerIcon className="size-4 animate-spin" />}
      {children}
    </Component>
  );
}
