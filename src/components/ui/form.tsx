import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { forwardRef, useId } from "react";

import { cn } from "@/lib/cn";

/* --------------------------------------------------------------- shared bits */

const controlBase =
  "w-full rounded-sm border bg-paper-raised px-4 py-3 text-[0.9375rem] " +
  "text-on-paper transition-colors duration-200 " +
  "placeholder:text-on-paper-muted/60 " +
  "border-on-paper/25 hover:border-on-paper/45 " +
  "focus:border-jade-strong " +
  "aria-[invalid=true]:border-danger aria-[invalid=true]:bg-danger/[0.03] " +
  "min-h-[44px]";

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="text-[0.8125rem] font-medium text-on-paper"
      >
        {label}
        {required ? (
          <span className="ml-1 text-jade-ink" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 font-mono text-[0.6875rem] tracking-[0.1em] uppercase text-on-paper-muted">
            optional
          </span>
        )}
      </label>

      {hint ? (
        <p id={`${id}-hint`} className="text-[0.8125rem] leading-relaxed text-on-paper-muted">
          {hint}
        </p>
      ) : null}

      {children}

      {/* role="alert" so a screen reader hears the message the moment it appears. */}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-[0.8125rem] leading-relaxed text-danger"
        >
          <span aria-hidden="true">↳</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Ties a control to its hint and error text for assistive technology. */
function describedBy(id: string, hint: boolean, error: boolean) {
  const ids = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

/* -------------------------------------------------------------------- inputs */

type BaseFieldProps = {
  label: string;
  hint?: ReactNode;
  error?: string;
  className?: string;
};

export const TextField = forwardRef<
  HTMLInputElement,
  BaseFieldProps & InputHTMLAttributes<HTMLInputElement>
>(function TextField(
  { label, hint, error, className, id, required, type = "text", ...props },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <FieldShell
      id={fieldId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <input
        ref={ref}
        id={fieldId}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fieldId, Boolean(hint), Boolean(error))}
        className={controlBase}
        {...props}
      />
    </FieldShell>
  );
});

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextAreaField(
  { label, hint, error, className, id, required, rows = 4, ...props },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <FieldShell
      id={fieldId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fieldId, Boolean(hint), Boolean(error))}
        className={cn(controlBase, "resize-y leading-relaxed")}
        {...props}
      />
    </FieldShell>
  );
});

export const SelectField = forwardRef<
  HTMLSelectElement,
  BaseFieldProps & {
    options: readonly string[];
    placeholder?: string;
  } & SelectHTMLAttributes<HTMLSelectElement>
>(function SelectField(
  { label, hint, error, className, id, required, options, placeholder, ...props },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <FieldShell
      id={fieldId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <select
        ref={ref}
        id={fieldId}
        required={required}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fieldId, Boolean(hint), Boolean(error))}
        className={cn(controlBase, "appearance-none bg-[length:0] pr-10")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%235c5f5a' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.9rem center",
          backgroundSize: "1rem",
        }}
        {...props}
      >
        <option value="" disabled>
          {placeholder ?? "Select one"}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
});

/* ------------------------------------------------------------- checkbox sets */

export function CheckboxField({
  label,
  error,
  id,
  children,
  ...props
}: {
  label: ReactNode;
  error?: string;
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-xs border border-on-paper/35 accent-[var(--color-jade-strong)]"
          {...props}
        />
        <label
          htmlFor={fieldId}
          className="cursor-pointer text-[0.875rem] leading-relaxed text-on-paper"
        >
          {label}
        </label>
      </div>
      {children}
      {error ? (
        <p
          id={`${fieldId}-error`}
          role="alert"
          className="text-[0.8125rem] text-danger"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * A group of related checkboxes. Uses a real <fieldset>/<legend> so the group
 * name is announced before each option, which a div with aria-label does not do
 * reliably across screen readers.
 */
export function CheckboxGroupField({
  legend,
  hint,
  error,
  options,
  selected,
  onToggle,
  required,
  columns = 2,
}: {
  legend: string;
  hint?: string;
  error?: string;
  options: readonly string[];
  selected: readonly string[];
  onToggle: (value: string) => void;
  required?: boolean;
  columns?: 2 | 3;
}) {
  const groupId = useId();

  return (
    <fieldset
      aria-describedby={describedBy(groupId, Boolean(hint), Boolean(error))}
      aria-invalid={error ? true : undefined}
    >
      <legend className="text-[0.8125rem] font-medium text-on-paper">
        {legend}
        {required ? (
          <span className="ml-1 text-jade-ink" aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>

      {hint ? (
        <p
          id={`${groupId}-hint`}
          className="mt-2 text-[0.8125rem] leading-relaxed text-on-paper-muted"
        >
          {hint}
        </p>
      ) : null}

      <div
        className={cn(
          "mt-3 grid gap-2",
          columns === 3
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : "sm:grid-cols-2",
        )}
      >
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label
              key={option}
              className={cn(
                "flex min-h-[44px] cursor-pointer items-center gap-3 rounded-sm border px-3.5 py-2.5 text-[0.875rem] transition-colors duration-200",
                checked
                  ? "border-jade-strong bg-jade/[0.07]"
                  : "border-on-paper/22 hover:border-on-paper/45",
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option)}
                className="size-4 shrink-0 accent-[var(--color-jade-strong)]"
              />
              {option}
            </label>
          );
        })}
      </div>

      {error ? (
        <p
          id={`${groupId}-error`}
          role="alert"
          className="mt-2.5 text-[0.8125rem] text-danger"
        >
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/* ------------------------------------------------------------------ honeypot */

/**
 * Bait field. Hidden from sight *and* from assistive technology, and excluded
 * from the tab order, so no real user can fill it in — but a naive bot will.
 */
export function Honeypot({
  name = "website",
  register,
}: {
  name?: string;
  register?: Record<string, unknown>;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={name}>Leave this field empty</label>
      <input
        id={name}
        name={name}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register}
      />
    </div>
  );
}

/* ------------------------------------------------------------------- summary */

/** Error summary shown above a failed form, linking to each broken field. */
export function FormStatus({
  status,
  message,
}: {
  status: "error" | "success";
  message: ReactNode;
}) {
  return (
    <div
      role={status === "error" ? "alert" : "status"}
      aria-live={status === "error" ? "assertive" : "polite"}
      className={cn(
        "rounded-sm border px-5 py-4 text-[0.9375rem] leading-relaxed",
        status === "error"
          ? "border-danger/40 bg-danger/[0.05] text-danger"
          : "border-jade-strong/50 bg-jade/[0.08] text-jade-ink",
      )}
    >
      {message}
    </div>
  );
}
