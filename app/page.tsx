import Image from "next/image";
import aboutImage from "@/public/aboutme/hero.png";
import logoImage from "@/public/logo.jpeg";
import understand from "@/public/process/understand.png";
import grade from "@/public/process/grade.png";
import refine from "@/public/process/refine.png";
import deliver from "@/public/process/deliver.png";

const process = [
  { title: "Understand", text: "We analyze the footage, references and creative goals.", image: understand },
  { title: "Grade", text: "I balance, shape and enhance the image with precision.", image: grade },
  { title: "Refine", text: "We iterate together until the look feels just right.", image: refine },
  { title: "Deliver", text: "Final delivery in the right format for your project.", image: deliver },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.7" r="1" className="icon-dot" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.8" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5.4-8 12-8 12S4 15.4 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  return (
    <a className={`logo${small ? " logo--small" : ""}`} href="#top" aria-label="Steven Murillo — Home">
      <Image src={logoImage} alt="SM" priority={!small} />
    </a>
  );
}

function GradientButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="gradient-button" href={href}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

export default function Home() {
  return (
    <main id="top">
      <section className="hero" aria-label="Introduction">
        <video className="hero__video" autoPlay loop muted playsInline preload="auto" aria-label="Cinematic portrait at night">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__shade" />

        <header className="site-header shell">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#work">Reel</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
          <details className="mobile-menu">
            <summary aria-label="Open menu"><i /><i /></summary>
            <nav aria-label="Mobile navigation">
              <a href="#work">Reel</a>
              <a href="#process">Process</a>
              <a href="#contact">Contact</a>
            </nav>
          </details>
        </header>

      </section>

      <section className="reel section shell" id="work" aria-labelledby="reel-title">
        <div className="section-heading">
          <h2 id="reel-title">Reel</h2>
        </div>
        <div className="reel-video-frame">
          <video className="reel-video" controls playsInline preload="metadata" poster="/projects/reel_poster.png">
            <source src="/projects/reel.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de vídeo.
          </video>
        </div>
      </section>

      <section className="process-section section" id="process" aria-labelledby="process-title">
        <div className="process-section__backdrop">
          <Image src={aboutImage} alt="" fill sizes="100vw" />
        </div>
        <div className="shell process-section__inner">
          <div className="section-heading">
            <h2 id="process-title">Process</h2>
          </div>

          <div className="process-grid">
            {process.map((step, index) => (
              <article className="process-step" key={step.title}>
                <span className="process-step__number">0{index + 1}</span>
                <div className="process-step__icon"><Image src={step.image} alt="" /></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      <section className="contact section shell" id="contact" aria-labelledby="contact-title">
        <div className="contact__intro">
          <h2 id="contact-title">Have a project<br />in mind?</h2>
          <p>I&apos;m always open to new collaborations.<br />Let&apos;s create something great together.</p>
          <GradientButton href="mailto:hello@stevenmurillo.com">Get in touch</GradientButton>
        </div>
        <address className="contact__details">
          <a href="mailto:hello@stevenmurillo.com"><span className="contact-icon"><MailIcon /></span>hello@stevenmurillo.com</a>
          <a href="https://www.instagram.com/murillozgz/"><span className="contact-icon"><InstagramIcon /></span>@murillozgz</a>
          <p><span className="contact-icon"><PinIcon /></span>Spain <i>•</i> Available worldwide</p>
        </address>
      </section>

      <footer className="footer shell">
        <Logo small />
        <nav aria-label="Footer navigation">
          <a href="#work">Reel</a><a href="#process">Process</a><a href="#contact">Contact</a>
        </nav>
        <p>© 2026 Steven Murillo Colorist<br />All rights reserved.</p>
        <a className="back-to-top" href="#top" aria-label="Back to top">↑</a>
      </footer>
    </main>
  );
}
