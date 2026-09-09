"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ArrowRight, Button } from "@/components/ui/button";
import {
  CheckboxField,
  CheckboxGroupField,
  FormStatus,
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/form";
import { trackEvent } from "@/lib/analytics";
import {
  AVAILABILITIES,
  CV_ACCEPTED_TYPE,
  CV_MAX_BYTES,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  TECH_STACK_OPTIONS,
  WORK_PREFERENCES,
  engineerProfileSchema,
  type EngineerProfile,
} from "@/lib/schemas";

const MAX_MB = CV_MAX_BYTES / (1024 * 1024);

export function EngineerForm() {
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const mountedAt = useRef(Date.now());
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<EngineerProfile>({
    resolver: zodResolver(engineerProfileSchema),
    mode: "onBlur",
    defaultValues: { stack: [], workPreference: [] },
  });

  const introLength = watch("intro")?.length ?? 0;

  useEffect(() => {
    if (submitState === "success") successRef.current?.focus();
  }, [submitState]);

  /* Client-side file gate. The server re-checks size and sniffs magic bytes —
     this only exists so the user finds out before a 5 MB upload. */
  const onCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setCvError(null);

    if (!file) {
      setCvFile(null);
      return;
    }
    if (file.type !== CV_ACCEPTED_TYPE) {
      setCvError("Please upload a PDF.");
      setCvFile(null);
      event.target.value = "";
      return;
    }
    if (file.size > CV_MAX_BYTES) {
      setCvError(`That file is over ${MAX_MB} MB. Please upload a smaller PDF.`);
      setCvFile(null);
      event.target.value = "";
      return;
    }
    setCvFile(file);
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState("submitting");
    setServerError(null);

    // multipart, because the CV rides along with the profile.
    const payload = new FormData();
    payload.append(
      "profile",
      JSON.stringify({ ...values, elapsedMs: Date.now() - mountedAt.current }),
    );
    if (cvFile) payload.append("cv", cvFile);

    try {
      const response = await fetch("/api/engineers", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setServerError(
          body?.error ??
            "Something went wrong on our end. Email engineers@swifthire.com and we'll add you manually.",
        );
        setSubmitState("error");
        return;
      }

      trackEvent("form_submit_engineer");
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
          Profile received
        </p>
        <h3 className="mt-5 text-[length:var(--text-h3)] leading-tight font-bold">
          Thanks. We&apos;ll review it within five business days.
        </h3>
        <p className="mt-4 leading-relaxed text-on-paper-muted">
          If your skills match what our clients are hiring for right now, a
          recruiter will email you to arrange a 20-minute intro call. If not, we
          keep your profile on file and come back when the market shifts — you
          will not hear from us in the meantime.
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
          label="Full name"
          required
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <TextField
          label="Email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="LinkedIn profile"
          type="url"
          required
          placeholder="https://linkedin.com/in/…"
          error={errors.linkedin?.message}
          {...register("linkedin")}
        />
        <TextField
          label="GitHub or portfolio"
          type="url"
          placeholder="https://github.com/…"
          error={errors.portfolio?.message}
          {...register("portfolio")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Current or target title"
          required
          placeholder="e.g. Senior Frontend Engineer"
          error={errors.title?.message}
          {...register("title")}
        />
        <SelectField
          label="Years of experience"
          required
          options={EXPERIENCE_LEVELS}
          placeholder="Select a range"
          error={errors.experience?.message}
          {...register("experience")}
        />
      </div>

      <Controller
        control={control}
        name="stack"
        render={({ field }) => (
          <CheckboxGroupField
            legend="Primary tech stack"
            required
            columns={3}
            hint="Pick up to 12 — the ones you would be happy to be interviewed on."
            options={TECH_STACK_OPTIONS}
            selected={field.value ?? []}
            onToggle={(value) => {
              const current = field.value ?? [];
              field.onChange(
                current.includes(value as never)
                  ? current.filter((item) => item !== value)
                  : [...current, value],
              );
            }}
            error={errors.stack?.message}
          />
        )}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label="Employment preference"
          required
          options={EMPLOYMENT_TYPES}
          placeholder="Select one"
          error={errors.employmentType?.message}
          {...register("employmentType")}
        />
        <SelectField
          label="Availability"
          required
          options={AVAILABILITIES}
          placeholder="Select one"
          error={errors.availability?.message}
          {...register("availability")}
        />
      </div>

      <TextField
        label="Current location"
        required
        autoComplete="address-level2"
        placeholder="e.g. Berlin, Germany"
        error={errors.location?.message}
        {...register("location")}
      />

      <Controller
        control={control}
        name="workPreference"
        render={({ field }) => (
          <CheckboxGroupField
            legend="Working preferences"
            required
            options={WORK_PREFERENCES}
            selected={field.value ?? []}
            onToggle={(value) => {
              const current = field.value ?? [];
              field.onChange(
                current.includes(value as never)
                  ? current.filter((item) => item !== value)
                  : [...current, value],
              );
            }}
            error={errors.workPreference?.message}
          />
        )}
      />

      <TextAreaField
        label="Anything you want us to know"
        rows={4}
        maxLength={500}
        placeholder="What you're looking for, what you'd rather avoid, domains that interest you."
        hint={`${introLength}/500 characters`}
        error={errors.intro?.message}
        {...register("intro")}
      />

      {/* CV upload */}
      <div className="flex flex-col gap-2">
        <label htmlFor="cv" className="text-[0.8125rem] font-medium">
          Upload your CV
          <span className="ml-2 font-mono text-[0.6875rem] tracking-[0.1em] uppercase text-on-paper-muted">
            optional
          </span>
        </label>
        <p id="cv-hint" className="text-[0.8125rem] leading-relaxed text-on-paper-muted">
          PDF only, up to {MAX_MB} MB. Stored encrypted and never shared without
          your say-so.
        </p>
        <input
          id="cv"
          name="cv"
          type="file"
          accept="application/pdf"
          onChange={onCvChange}
          aria-describedby={cvError ? "cv-hint cv-error" : "cv-hint"}
          aria-invalid={cvError ? true : undefined}
          className="w-full cursor-pointer rounded-sm border border-on-paper/25 bg-paper-raised px-4 py-3 text-[0.875rem] transition-colors file:mr-4 file:cursor-pointer file:rounded-xs file:border-0 file:bg-ink file:px-4 file:py-2 file:font-medium file:text-on-ink hover:border-on-paper/45"
        />
        {cvFile ? (
          <p className="font-mono text-[0.75rem] text-jade-ink">
            {cvFile.name} · {(cvFile.size / 1024).toFixed(0)} KB
          </p>
        ) : null}
        {cvError ? (
          <p id="cv-error" role="alert" className="text-[0.8125rem] text-danger">
            {cvError}
          </p>
        ) : null}
      </div>

      <div className="border-t border-on-paper/15 pt-6">
        <CheckboxField
          label={
            <>
              I consent to Staffing Viro holding these details for recruitment
              purposes, and to being contacted about relevant roles. I can ask
              for my data to be deleted at any time.
            </>
          }
          error={errors.consent?.message}
          {...register("consent")}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitState === "submitting"}
        className="w-full sm:w-auto sm:self-start"
      >
        {submitState === "submitting" ? "Submitting…" : "Submit my profile"}
        {submitState === "submitting" ? null : <ArrowRight />}
      </Button>
    </form>
  );
}
