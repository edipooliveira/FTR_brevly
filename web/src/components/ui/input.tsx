import { type ComponentProps, forwardRef, useId } from "react";
import { tv } from "tailwind-variants";
import { WarningIcon } from "../icons/warning";

const inputVariants = tv({
  slots: {
    root: "group flex w-full flex-col gap-2",
    label: "text-xs uppercase text-gray-500",
    field:
      "group/field flex h-12 items-center rounded-lg border border-gray-300 px-4 transition-colors",
    prefix:
      "select-none text-md text-gray-600 group-has-[input:placeholder-shown]/field:text-gray-400",
    control:
      "h-full w-full min-w-0 flex-1 bg-transparent text-md text-gray-600 caret-blue-base outline-none placeholder:text-gray-400",
    message: "flex items-center gap-2 text-sm text-gray-500",
    messageIcon: "size-4 shrink-0 text-danger",
  },

  variants: {
    hasError: {
      true: {
        label: "font-bold text-danger",
        field: "border-1.5 border-danger px-[15.5px]",
      },
      false: {
        label: "group-focus-within:font-bold group-focus-within:text-blue-base",
        field:
          "focus-within:border-1.5 focus-within:border-blue-base focus-within:px-[15.5px]",
      },
    },
  },

  defaultVariants: {
    hasError: false,
  },
});

type InputProps = ComponentProps<"input"> & {
  label: string;
  prefix?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { label, prefix, error, id, className, placeholder, ...props },
    ref
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-message`;

    const styles = inputVariants({ hasError: Boolean(error) });

    return (
      <div className={styles.root({ className })}>
        <label htmlFor={inputId} className={styles.label()}>
          {label}
        </label>

        <div className={styles.field()}>
          {prefix && <span className={styles.prefix()}>{prefix}</span>}

          <input
            ref={ref}
            id={inputId}
            className={styles.control()}
            // An empty space keeps :placeholder-shown working for the prefix color.
            placeholder={placeholder ?? (prefix ? " " : undefined)}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? messageId : undefined}
            {...props}
          />
        </div>

        {error && (
          <p id={messageId} className={styles.message()}>
            <WarningIcon className={styles.messageIcon()} />
            {error}
          </p>
        )}
      </div>
    );
  }
);
