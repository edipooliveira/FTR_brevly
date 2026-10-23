import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const iconButtonVariants = tv({
  base: "flex items-center justify-center rounded border border-transparent bg-gray-200 text-gray-600 transition-colors hover:border-blue-base focus-visible:outline-none focus-visible:border-blue-base disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",

  variants: {
    size: {
      default: "size-8 [&_svg]:size-4",
    },
  },

  defaultVariants: {
    size: "default",
  },
});

type IconButtonProps = ComponentProps<"button"> &
  VariantProps<typeof iconButtonVariants> & {
    asChild?: boolean;
  };

export function IconButton({
  size,
  className,
  asChild,
  ...props
}: IconButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component className={iconButtonVariants({ size, className })} {...props} />
  );
}
