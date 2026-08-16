import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "smurilloprod@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ??
  "Steven Murillo Portfolio <onboarding@resend.dev>";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character]!,
  );
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  const body = payload as ContactRequest;

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";

  if (website) {
    return Response.json({ message: "Message sent." });
  }

  if (
    name.length < 2 ||
    name.length > 80 ||
    email.length > 254 ||
    !isEmail(email) ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return Response.json(
      { message: "Please check the form fields." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return Response.json(
      { message: "Email service is not configured." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const subjectName = name.replace(/[\r\n]+/g, " ");

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New project enquiry from ${subjectName}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>New project enquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      console.error("Resend rejected the contact email:", error);
      return Response.json(
        { message: "The message could not be sent." },
        { status: 502 },
      );
    }

    return Response.json({ message: "Message sent." });
  } catch (error) {
    console.error("Contact email failed:", error);
    return Response.json(
      { message: "The message could not be sent." },
      { status: 502 },
    );
  }
}
