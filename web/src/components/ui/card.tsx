import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const cardVariants = tv({
  base: "w-full rounded-lg bg-gray-100 p-6 md:p-8",
});

type CardProps = ComponentProps<"div"> & {
  asChild?: boolean;
};

export function Card({ className, asChild, ...props }: CardProps) {
  const Component = asChild ? Slot : "div";

  return <Component className={cardVariants({ className })} {...props} />;
}
