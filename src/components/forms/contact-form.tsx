"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { ArrowRight, Button } from "@/components/ui/button";
import {
  FormStatus,
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/form";
import { trackEvent } from "@/lib/analytics";
import {
  clientEnquirySchema,
  REFERRAL_SOURCES,
  TEAM_SIZES,
  URGENCIES,
  type ClientEnquiry,
} from "@/lib/schemas";

const MODEL_LABELS: Record<string, string> = {
  "per-hire": "Per-hire (contingency)",
  "retained-search": "Retained search",
  "embedded-recruiter": "Embedded recruiter",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const mountedAt = useRef(Date.now());
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClientEnquiry>({
    resolver: zodResolver(clientEnquirySchema),
    mode: "onBlur",
  });

  /* Prefill the message when the visitor arrived from a specific service tier. */
  useEffect(() => {
    const model = searchParams.get("model");
    const label = model ? MODEL_LABELS[model] : undefined;
    if (label) {
      setValue("message", `I'm interested in the ${label} model.`);
    }
  }, [searchParams, setValue]);

  /* Move focus to the confirmation so keyboard and screen-reader users land on it. */
  useEffect(() => {
    if (submitState === "success") successRef.current?.focus();
  }, [submitState]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setServerError(
          body?.error ??
            "Something went wrong on our end. Email hello@swifthire.com and we'll pick it up.",
        );
        setSubmitState("error");
        return;
      }

      trackEvent("form_submit_client");
      setSubmitState("success");
    } catch {
      setServerError(
        "We couldn't reach the server. Check your connection and try again.",
      );
      setSubmitState("error");
    }
  });

  if (submitState === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-md border border-jade-strong/50 bg-jade/[0.07] p-8 focus:outline-none md:p-10"
      >
        <p className="eyebrow text-jade-ink">
          <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
          Enquiry received
        </p>
        <h3 className="mt-5 text-[length:var(--text-h3)] leading-tight font-bold">
          Got it. We&apos;ll be in touch within one business day.
        </h3>
        <p className="mt-4 leading-relaxed text-on-paper-muted">
          A recruiter will read your brief and reply with either a set of
          questions or a proposed kickoff time. If the role is outside what we
          cover, we will say so rather than waste your week.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {submitState === "error" && serverError ? (
        <FormStatus status="error" message={serverError} />
      ) : null}

      <Honeypot register={register("website")} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Company name"
          required
          autoComplete="organization"
          error={errors.companyName?.message}
          {...register("companyName")}
        />
        <TextField
          label="Your name"
          required
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
      </div>

      <TextField
        label="Work email"
        type="email"
        required
        inputMode="email"
        autoComplete="email"
        hint="We reply here — please use an address you check."
        error={errors.email?.message}
        {...register("email")}
      />

      <TextAreaField
        label="Roles you're hiring for"
        required
        rows={4}
        placeholder="e.g. 2 × Senior Backend (Go), 1 × Staff Platform Engineer. Remote-first, EU timezones."
        hint="List every role. Seniority and stack help us answer properly."
        error={errors.roles?.message}
        {...register("roles")}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label="Engineering team size"
          required
          options={TEAM_SIZES}
          placeholder="Select a range"
          error={errors.teamSize?.message}
          {...register("teamSize")}
        />
        <SelectField
          label="How soon do you need this filled?"
          required
          options={URGENCIES}
          placeholder="Select a timeline"
          error={errors.urgency?.message}
          {...register("urgency")}
        />
      </div>

      <SelectField
        label="How did you hear about us?"
        options={REFERRAL_SOURCES}
        placeholder="Select one"
        error={errors.referral?.message}
        {...register("referral")}
      />

      <TextAreaField
        label="Anything else"
        rows={4}
        placeholder="Budget band, must-have experience, why the last search didn't work — whatever helps."
        error={errors.message?.message}
        {...register("message")}
      />

      <div className="flex flex-col gap-4 border-t border-on-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.8125rem] leading-relaxed text-on-paper-muted">
          By sending this you agree we may store these details to respond to
          your enquiry. See our{" "}
          <a
            href="/privacy-policy"
            className="rounded-xs text-on-paper underline underline-offset-4 transition-colors hover:text-jade-ink"
          >
            privacy policy
          </a>
          .
        </p>

        <Button
          type="submit"
          size="lg"
          disabled={submitState === "submitting"}
          className="w-full shrink-0 sm:w-auto"
        >
          {submitState === "submitting" ? "Sending…" : "Send enquiry"}
          {submitState === "submitting" ? null : <ArrowRight />}
        </Button>
      </div>
    </form>
  );
}
