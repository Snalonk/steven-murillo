"use client";

import { FormEvent, useState } from "react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error("The message could not be sent.");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          minLength={2}
          maxLength={80}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@email.com"
          autoComplete="email"
          maxLength={254}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Tell me about your project..."
          rows={6}
          minLength={10}
          maxLength={5000}
          required
        />
      </div>

      <div className="form-field form-field--website" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        className="contact-form__submit"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Start a project"}
        <span aria-hidden="true">↗</span>
      </button>

      <p
        className={`contact-form__status contact-form__status--${status}`}
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {status === "success" && "Thanks! Your message has been sent."}
        {status === "error" &&
          "Something went wrong. Please try again or email me directly."}
      </p>
    </form>
  );
}
