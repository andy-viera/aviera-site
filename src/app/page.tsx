"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import GeoBlock from "@/components/GeoBlock";
import Scene3D from "@/components/Scene3D";

const LINKS = {
  github: "https://github.com/andy-viera",
  linkedin: "https://linkedin.com/in/andres-viera",
  x: "https://x.com/andy__viera",
  email: "mailto:contact@aviera.me",
};

function ArrowIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 17L17 7M17 7H7M17 7v10"
      />
    </svg>
  );
}

function SocialLinks({ style: extraStyle = {} }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: "flex", gap: "20px", ...extraStyle }}>
      {Object.entries(LINKS).map(([name, url]) => (
        <a
          key={name}
          href={url}
          target={name === "email" ? undefined : "_blank"}
          rel={name === "email" ? undefined : "noopener noreferrer"}
          style={{
            borderLeft: "2px solid rgba(129, 140, 248, 0.3)",
            padding: "4px 10px",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)",
            transition: "color 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
        >
          {name}
          <ArrowIcon />
        </a>
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "11px",
      fontFamily: "var(--font-mono), monospace",
      textTransform: "uppercase",
      letterSpacing: "0.3em",
      color: "rgba(129, 140, 248, 0.5)",
      marginBottom: "40px",
      textAlign: "center",
    }}>
      {"//  "}
      {children}
    </p>
  );
}

function HudFrame({ children, style: extraStyle = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      position: "relative",
      padding: "24px",
      background: "rgba(129, 140, 248, 0.03)",
      border: "1px solid rgba(129, 140, 248, 0.12)",
      clipPath: "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
      ...extraStyle,
    }}>
      <div style={{ position: "absolute", top: "-1px", left: "8px", width: "20px", height: "1px", background: "rgba(129, 140, 248, 0.5)" }} />
      <div style={{ position: "absolute", top: "8px", left: "-1px", width: "1px", height: "20px", background: "rgba(129, 140, 248, 0.5)" }} />
      <div style={{ position: "absolute", top: "-1px", right: "8px", width: "20px", height: "1px", background: "rgba(129, 140, 248, 0.5)" }} />
      <div style={{ position: "absolute", top: "8px", right: "-1px", width: "1px", height: "20px", background: "rgba(129, 140, 248, 0.5)" }} />
      <div style={{ position: "absolute", bottom: "-1px", left: "8px", width: "20px", height: "1px", background: "rgba(129, 140, 248, 0.5)" }} />
      <div style={{ position: "absolute", bottom: "8px", left: "-1px", width: "1px", height: "20px", background: "rgba(129, 140, 248, 0.5)" }} />
      <div style={{ position: "absolute", bottom: "-1px", right: "8px", width: "20px", height: "1px", background: "rgba(129, 140, 248, 0.5)" }} />
      <div style={{ position: "absolute", bottom: "8px", right: "-1px", width: "1px", height: "20px", background: "rgba(129, 140, 248, 0.5)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function ExperienceCard({
  role,
  company,
  period,
  description,
  tags,
}: {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{
        position: "relative",
        padding: "16px",
        background: "rgba(129, 140, 248, 0.03)",
        border: "1px solid rgba(129, 140, 248, 0.12)",
        clipPath: "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
      }}>
        <div style={{ position: "absolute", top: "-1px", left: "8px", width: "20px", height: "1px", background: "rgba(129, 140, 248, 0.5)" }} />
        <div style={{ position: "absolute", top: "8px", left: "-1px", width: "1px", height: "20px", background: "rgba(129, 140, 248, 0.5)" }} />
        <div style={{ position: "absolute", top: "-1px", right: "8px", width: "20px", height: "1px", background: "rgba(129, 140, 248, 0.5)" }} />
        <div style={{ position: "absolute", top: "8px", right: "-1px", width: "1px", height: "20px", background: "rgba(129, 140, 248, 0.5)" }} />
        <div style={{ position: "absolute", bottom: "-1px", left: "8px", width: "20px", height: "1px", background: "rgba(129, 140, 248, 0.5)" }} />
        <div style={{ position: "absolute", bottom: "8px", left: "-1px", width: "1px", height: "20px", background: "rgba(129, 140, 248, 0.5)" }} />
        <div style={{ position: "absolute", bottom: "-1px", right: "8px", width: "20px", height: "1px", background: "rgba(129, 140, 248, 0.5)" }} />
        <div style={{ position: "absolute", bottom: "8px", right: "-1px", width: "1px", height: "20px", background: "rgba(129, 140, 248, 0.5)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
            <div>
              <h3 style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500, fontSize: "15px" }}>{role}</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>{company}</p>
            </div>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", fontFamily: "var(--font-mono), monospace", flexShrink: 0, marginLeft: "16px" }}>
              {period}
            </span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", lineHeight: 1.6, marginBottom: "8px" }}>
            {description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono), monospace",
                padding: "2px 8px",
                background: "rgba(129, 140, 248, 0.06)",
                color: "rgba(129, 140, 248, 0.5)",
                border: "1px solid rgba(129, 140, 248, 0.1)",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  href,
}: {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <HudFrame>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <h3 style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500, fontSize: "15px" }}>{title}</h3>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >
              <ArrowIcon />
            </a>
          )}
        </div>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.625, marginBottom: "16px" }}>
          {description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              fontSize: "10px",
              fontFamily: "var(--font-mono), monospace",
              padding: "2px 8px",
              background: "rgba(129, 140, 248, 0.06)",
              color: "rgba(129, 140, 248, 0.5)",
              border: "1px solid rgba(129, 140, 248, 0.1)",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </HudFrame>
    </div>
  );
}

/* --- Mask Reveal Name (line sweep) --- */
function MaskRevealName() {
  return (
    <div style={{ position: "relative", overflow: "visible", padding: "40px 0" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes stringsVibrate {
          0% { background-position: 0 0; }
          50% { background-position: 0 1px; }
          100% { background-position: 0 0; }
        }
      `}} />
      <h1
        style={{
          fontSize: "clamp(3.5rem, 9vw, 6.5rem)",
          fontWeight: 750,
          letterSpacing: "-0.035em",
          lineHeight: 1.05,
          color: "#ffffff",
          marginBottom: 0,
          clipPath: "inset(0 100% 0 0)",
          background: "repeating-linear-gradient(0deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 3px)",
          backgroundSize: "100% 3px",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "stringsVibrate 0.3s ease-in-out infinite",
        }}
        data-gsap="mask-text"
      >
        Andy Viera
      </h1>
      <div
        data-gsap="sweep-line"
        style={{
          position: "absolute",
          top: "-40px",
          left: 0,
          width: "4px",
          height: "calc(100% + 80px)",
          background: "linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.8) 15%, rgba(255,255,255,1) 50%, rgba(99,102,241,0.8) 85%, transparent 100%)",
          boxShadow: "0 0 20px rgba(99,102,241,0.8), 0 0 60px rgba(99,102,241,0.4), 0 0 100px rgba(99,102,241,0.2)",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* --- Typewriter with Backspace --- */
function TypewriterText({
  texts,
  holdMs = 2500,
  style: extraStyle = {},
}: {
  texts: string[];
  holdMs?: number;
  style?: React.CSSProperties;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const blinkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    let textIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (!el) return;
      const text = texts[textIdx];

      if (!deleting) {
        charIdx++;
        el.textContent = text.slice(0, charIdx);

        if (charIdx === text.length) {
          timer = setTimeout(() => {
            deleting = true;
            tick();
          }, holdMs);
          return;
        }
        timer = setTimeout(tick, 45 + Math.random() * 55);
      } else {
        charIdx--;
        el.textContent = text.slice(0, charIdx);

        if (charIdx === 0) {
          deleting = false;
          textIdx = (textIdx + 1) % texts.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 20 + Math.random() * 25);
      }
    }

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [texts, holdMs]);

  useEffect(() => {
    const cursor = blinkRef.current;
    if (!cursor) return;
    const interval = setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ ...extraStyle, display: "inline-flex", alignItems: "center" }}>
      <span ref={spanRef} />
      <span
        ref={blinkRef}
        style={{
          display: "inline-block",
          width: "6px",
          height: "1.1em",
          backgroundColor: "rgba(129, 140, 248, 0.7)",
          marginLeft: "3px",
          verticalAlign: "text-bottom",
          borderRadius: "1px",
        }}
      />
    </span>
  );
}

/* --- Station: Home --- */
function HomeStation() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(
        "[data-gsap='mask-text']",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power2.inOut" }
      );
      tl.fromTo(
        "[data-gsap='sweep-line']",
        { left: "0%", opacity: 1 },
        { left: "100%", opacity: 1, duration: 1.4, ease: "power2.inOut" },
        "<"
      );
      tl.to("[data-gsap='sweep-line']", { opacity: 0, duration: 0.3 });

      tl.to(
        "[data-gsap='hero-rule']",
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.5"
      );
      tl.to(
        "[data-gsap='hero-age']",
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
      tl.to(
        "[data-gsap='hero-scramble']",
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
    },
    { scope: heroRef }
  );

  return (
    <div ref={heroRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <MaskRevealName />

      {/* Decorative line */}
      <div
        data-gsap="hero-rule"
        style={{
          width: "60px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)",
          margin: "24px 0",
          transform: "scaleX(0)",
          opacity: 0,
          transformOrigin: "center",
        }}
      />

      {/* Age */}
      <p
        data-gsap="hero-age"
        style={{
          fontFamily: "var(--font-mono), monospace",
          color: "rgba(255,255,255,0.3)",
          fontSize: "14px",
          marginBottom: "6px",
          opacity: 0,
          transform: "translateY(12px)",
        }}
      >
        a 21 yo
      </p>

      {/* Typewriter cycling text */}
      <div
        data-gsap="hero-scramble"
        style={{ marginBottom: 0, opacity: 0, transform: "translateY(12px)" }}
      >
        <TypewriterText
          texts={["software engineer", "AI maximalist", "voice AI engineer"]}
          holdMs={2500}
          style={{
            fontFamily: "var(--font-mono), monospace",
            color: "rgba(129, 140, 248, 0.85)",
            fontSize: "15px",
            letterSpacing: "0.05em",
          }}
        />
      </div>

    </div>
  );
}

/* --- Station: About --- */
function AboutStation() {
  return (
    <div style={{ textAlign: "center" }}>
      <SectionLabel>About</SectionLabel>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", lineHeight: 1.8, marginBottom: "16px" }}>
        I like going deep on hard problems and shipping things people
        actually use. Started coding at 15, went from game servers to a
        software factory to building voice AI workers from scratch at
        an insurtech startup.
      </p>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", lineHeight: 1.8 }}>
        Currently deep into voice AI — building AI workers that handle real
        phone calls, sell insurance policies, and transfer to humans when
        needed. Seeking my next challenge in San Francisco.
      </p>
    </div>
  );
}

/* --- Station: Experience --- */
function ExperienceStation() {
  return (
    <div style={{ paddingTop: "16px", paddingBottom: "16px" }}>
      <div style={{ marginTop: "16px" }}>
        <SectionLabel>Experience</SectionLabel>
      </div>
      <ExperienceCard
        role="AI Engineer"
        company="Foliume"
        period="Mar 2025 — present"
        description="Built the entire AI agent infrastructure from an empty repository. Speech-to-speech and cascaded voice architectures with sub-second latency, VAD, AEC, and hyper-realistic voices. Chat workers processing multimodal inputs became a core driver of 30,000+ monthly insurance quotes. Four production voice flows: triage, customer support, sales, cross-selling. Full ownership of the most revenue-critical lane in the company."
        tags={["Python", "Gemini Live", "LiveKit", "SIP/RTP", "FastAPI", "AWS ECS", "DynamoDB", "Twilio"]}
      />
      <ExperienceCard
        role="Software Engineer"
        company="Pento"
        period="Jan 2023 — Mar 2025"
        description="Founding member of the application engineering team. Built AI products for US clients in healthcare and biotech. Shipped a medical transcription platform reducing physician documentation time, and a biotech platform for airborne pathogen analysis."
        tags={["Next.js", "React Native", "Expo", "TypeScript", "PostgreSQL"]}
      />
      <ExperienceCard
        role="Founder"
        company="FiveM Game Server"
        period="2019 — 2021"
        description="Started at 15. Built and operated a multiplayer game server generating $1K/month revenue. Managed a team of 10+ people daily. First experience building something people paid for."
        tags={["Lua", "Community", "Operations", "Revenue"]}
      />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
        <a
          href="/Andres_Viera_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontFamily: "var(--font-mono), monospace",
            color: "rgba(129, 140, 248, 0.6)",
            textDecoration: "none",
            padding: "6px 16px",
            border: "1px solid rgba(129, 140, 248, 0.15)",
            background: "rgba(129, 140, 248, 0.03)",
            clipPath: "polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(129, 140, 248, 0.4)";
            e.currentTarget.style.color = "rgba(129, 140, 248, 0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(129, 140, 248, 0.15)";
            e.currentTarget.style.color = "rgba(129, 140, 248, 0.6)";
          }}
        >
          resume
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* --- Station: Projects --- */
function ProjectsStation() {
  return (
    <div>
      <SectionLabel>Projects</SectionLabel>
      <ProjectCard
        title="NERV"
        description="Live on the App Store with paying users. Consumer mobile app for social skill development through AI-powered voice practice. Real-time feedback on tone, pacing, and delivery. Handling product, engineering, and distribution solo."
        tags={["React Native", "Expo", "TypeScript", "Supabase", "RevenueCat"]}
        href="https://apps.apple.com/us/app/nerv-talk-like-you-mean-it/id6759537342"
      />
      <ProjectCard
        title="ContractorsUy"
        description="Open-source tool that streamlines the transition from employment to independent contracting for software developers in Uruguay. Tax calculations, legal guidance, cost comparisons."
        tags={["TypeScript", "Next.js", "Open Source"]}
        href="https://github.com/andy-viera/contractorsUy"
      />
    </div>
  );
}

/* --- Station: Personal --- */
function PersonalStation() {
  const slots = [
    { x: 0, y: 0, rot: -2 },
    { x: -170, y: 15, rot: 4 },
    { x: 160, y: -10, rot: -3 },
  ];
  const photoData = [
    { src: "/andy-2.jpg", alt: "Golden Gate Bridge", pos: "center 20%" },
    { src: "/andy-1.jpg", alt: "SF streets", pos: "center" },
    { src: "/andy-3.jpg", alt: "What will you ship?", pos: "center" },
  ];
  // order[0] = center, order[1] = left, order[2] = right
  const [order, setOrder] = useState([0, 1, 2]);
  const dragStartRef = useRef({ slotIdx: -1, sx: 0 });

  const onDown = (e: React.MouseEvent, slotIdx: number) => {
    e.preventDefault();
    dragStartRef.current = { slotIdx, sx: e.clientX };

    const onUp = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStartRef.current.sx;
      if (Math.abs(dx) > 50) {
        const right = dx > 0;
        setOrder((prev) => {
          const next = [...prev];
          const si = dragStartRef.current.slotIdx;
          if (si === 0) {
            const t = right ? 2 : 1;
            [next[0], next[t]] = [next[t], next[0]];
          } else if (si === 1) {
            const t = right ? 0 : 2;
            [next[si], next[t]] = [next[t], next[si]];
          } else {
            const t = right ? 1 : 0;
            [next[si], next[t]] = [next[t], next[si]];
          }
          return next;
        });
      }
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mouseup", onUp);
  };

  const clipPath = "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)";

  return (
    <div>
      <SectionLabel>Beyond the code</SectionLabel>

      {/* Photo collage — drag to shuffle */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "340px", marginBottom: "32px", userSelect: "none" }}>
        {/* Render order: left(1), center(0), right(2) so center is visually in the middle */}
        {[1, 0, 2].map((slotIdx) => {
          const photoIdx = order[slotIdx];
          const photo = photoData[photoIdx];
          const isCenter = slotIdx === 0;
          const rot = slots[slotIdx].rot;
          return (
            <motion.div
              key={photoIdx}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onMouseDown={(e) => onDown(e, slotIdx)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 1.08, rotate: rot + 1 }}
              style={{
                width: isCenter ? "230px" : "190px",
                height: isCenter ? "300px" : "250px",
                flexShrink: 0,
                marginLeft: slotIdx === 0 ? "-20px" : "-20px",
                marginRight: slotIdx === 2 ? "0" : "-20px",
                rotate: rot,
                clipPath,
                overflow: "hidden",
                border: isCenter ? "1px solid rgba(129,140,248,0.35)" : "1px solid rgba(129,140,248,0.12)",
                cursor: "grab",
                boxShadow: isCenter ? "0 0 30px rgba(129,140,248,0.1), 0 8px 24px rgba(0,0,0,0.4)" : "0 4px 12px rgba(0,0,0,0.3)",
                position: "relative",
              }}
            >
              <img src={photo.src} alt={photo.alt} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: photo.pos, pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)", pointerEvents: "none", opacity: 0.3 }} />
              {[
                { top: "6px", left: "12px", width: "14px", height: "1px" },
                { top: "12px", left: "6px", width: "1px", height: "14px" },
                { top: "6px", right: "12px", width: "14px", height: "1px" },
                { top: "12px", right: "6px", width: "1px", height: "14px" },
                { bottom: "6px", left: "12px", width: "14px", height: "1px" },
                { bottom: "12px", left: "6px", width: "1px", height: "14px" },
                { bottom: "6px", right: "12px", width: "14px", height: "1px" },
                { bottom: "12px", right: "6px", width: "1px", height: "14px" },
              ].map((s, j) => (
                <div key={j} style={{ position: "absolute", ...s, background: `rgba(129,140,248,${isCenter ? 0.6 : 0.35})` }} />
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* Interest cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", textAlign: "center" }}>
        <HudFrame>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(129,140,248,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
              <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3 5.5V16a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-1.5C6.5 13.5 5 11.5 5 9a7 7 0 0 1 7-7z" />
              <path d="M9 21h6" />
              <path d="M10 17v4" />
              <path d="M14 17v4" />
            </svg>
          </div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 500, marginBottom: "4px" }}>Philosophy</p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontFamily: "var(--font-mono), monospace", lineHeight: 1.4 }}>All certainty dissolved — except the need to understand.</p>
        </HudFrame>

        <HudFrame>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(129,140,248,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
              <circle cx="12" cy="12" r="3" />
              <ellipse cx="12" cy="12" rx="10" ry="4" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
            </svg>
          </div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 500, marginBottom: "4px" }}>Physics</p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontFamily: "var(--font-mono), monospace", lineHeight: 1.4 }}>The lens through which seeking becomes knowing.</p>
        </HudFrame>

        <HudFrame>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(129,140,248,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
              <path d="M3 12h2l3-9 4 18 3-9h6" />
            </svg>
          </div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 500, marginBottom: "4px" }}>Fitness</p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontFamily: "var(--font-mono), monospace", lineHeight: 1.4 }}>Infinite voyage, finite vessel. Narrow the gap.</p>
        </HudFrame>
      </div>
    </div>
  );
}

/* --- Station: Contact --- */
function ContactStation() {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "17px", fontWeight: 500, marginBottom: "12px" }}>
        Let&apos;s build something together
      </p>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto 32px" }}>
        Looking for my next challenge in San Francisco. If you&apos;re
        building something hard and need someone who goes deep, let&apos;s
        talk.
      </p>

      <a
        href="mailto:contact@aviera.me"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "15px",
          fontFamily: "var(--font-mono), monospace",
          color: "rgba(99, 102, 241, 0.8)",
          textDecoration: "none",
          padding: "10px 24px",
          clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          background: "rgba(99, 102, 241, 0.05)",
          marginBottom: "40px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.5)";
          e.currentTarget.style.background = "rgba(99, 102, 241, 0.1)";
          e.currentTarget.style.color = "rgba(99, 102, 241, 1)";
          const arrow = e.currentTarget.querySelector("svg");
          if (arrow) (arrow as unknown as HTMLElement).style.transform = "translate(3px, -3px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.2)";
          e.currentTarget.style.background = "rgba(99, 102, 241, 0.05)";
          e.currentTarget.style.color = "rgba(99, 102, 241, 0.8)";
          const arrow = e.currentTarget.querySelector("svg");
          if (arrow) (arrow as unknown as HTMLElement).style.transform = "translate(0, 0)";
        }}
      >
        contact@aviera.me
        <svg
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{ transition: "transform 0.3s ease" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M17 7H7M17 7v10"
          />
        </svg>
      </a>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          {Object.entries(LINKS).filter(([name]) => name !== "email").map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono), monospace",
                color: "rgba(255,255,255,0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                textDecoration: "none",
                borderLeft: "2px solid rgba(129,140,248,0.3)",
                padding: "4px 10px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
            >
              {name}
              <ArrowIcon />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}

/* --- Cockpit Frame Overlay --- */
function CockpitFrame({ station, onNavigate }: { station: string; onNavigate: (s: string) => void }) {
  const stations = [
    { id: "home", label: "HOME", key: "01" },
    { id: "about", label: "ABOUT", key: "02" },
    { id: "experience", label: "EXPERIENCE", key: "03" },
    { id: "projects", label: "PROJECTS", key: "04" },
    { id: "personal", label: "LIFE", key: "05" },
    { id: "contact", label: "CONTACT", key: "06" },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, pointerEvents: "none" }}>
      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "36px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
        background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(129,140,248,0.08)",
        pointerEvents: "none",
      }}>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(129,140,248,0.3)" }}>
          SYS.ONLINE // AVIERA.ME
        </span>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(129,140,248,0.3)" }}>
          NAV.{stations.find(s => s.id === station)?.key || "00"} // {station.toUpperCase()}
        </span>
      </div>

      {/* Left nav panel */}
      <nav style={{
        position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: "4px",
        padding: "16px 0",
        pointerEvents: "auto",
      }}>
        {stations.map((s) => (
          <button
            key={s.id}
            onClick={() => onNavigate(s.id)}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.12em",
              padding: "12px 20px 12px 16px",
              border: "none",
              borderLeft: station === s.id ? "2px solid rgba(129,140,248,0.8)" : "2px solid rgba(129,140,248,0.08)",
              borderRight: "none",
              background: station === s.id ? "linear-gradient(90deg, rgba(129,140,248,0.12), transparent 80%)" : "linear-gradient(90deg, rgba(255,255,255,0.01), transparent)",
              color: station === s.id ? "rgba(129,140,248,0.95)" : "rgba(255,255,255,0.35)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textAlign: "left" as const,
            }}
          >
            <span style={{ color: "rgba(129,140,248,0.3)", fontSize: "8px" }}>{s.key}</span>
            {s.label}
          </button>
        ))}
      </nav>

      {/* Bottom bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "28px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
        borderTop: "1px solid rgba(129,140,248,0.08)",
        pointerEvents: "none",
      }}>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(129,140,248,0.2)" }}>
          ANDY VIERA // 2026
        </span>
      </div>

      {/* Corner brackets -- top left */}
      <div style={{ position: "absolute", top: "40px", left: "8px", width: "30px", height: "1px", background: "rgba(129,140,248,0.15)" }} />
      <div style={{ position: "absolute", top: "40px", left: "8px", width: "1px", height: "30px", background: "rgba(129,140,248,0.15)" }} />
      {/* Corner brackets -- top right */}
      <div style={{ position: "absolute", top: "40px", right: "8px", width: "30px", height: "1px", background: "rgba(129,140,248,0.15)" }} />
      <div style={{ position: "absolute", top: "40px", right: "8px", width: "1px", height: "30px", background: "rgba(129,140,248,0.15)" }} />
      {/* Corner brackets -- bottom left */}
      <div style={{ position: "absolute", bottom: "32px", left: "8px", width: "30px", height: "1px", background: "rgba(129,140,248,0.15)" }} />
      <div style={{ position: "absolute", bottom: "32px", left: "8px", width: "1px", height: "30px", background: "rgba(129,140,248,0.15)" }} />
      {/* Corner brackets -- bottom right */}
      <div style={{ position: "absolute", bottom: "32px", right: "8px", width: "30px", height: "1px", background: "rgba(129,140,248,0.15)" }} />
      <div style={{ position: "absolute", bottom: "32px", right: "8px", width: "1px", height: "30px", background: "rgba(129,140,248,0.15)" }} />
    </div>
  );
}

/* --- Shooting Stars Canvas (2D overlay) --- */
function ShootingStarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const warpingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Hide stars during warp so only 3D particles streak
    const onStartWarp = () => { warpingRef.current = true; canvas.style.opacity = "0"; canvas.style.transition = "opacity 0.2s"; };
    const onEndWarp = () => { warpingRef.current = false; canvas.style.opacity = "1"; canvas.style.transition = "opacity 0.5s"; };
    window.addEventListener("startWarp", onStartWarp);
    window.addEventListener("endWarp", onEndWarp);

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.5 + Math.random() * 1.5,
      baseOpacity: 0.1 + Math.random() * 0.4,
      twinkleSpeed: 0.5 + Math.random() * 2,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      length: number;
    }

    const shootingStars: ShootingStar[] = [];
    let nextSpawn = 300 + Math.random() * 300;
    let frame = 0;

    function spawnShootingStar() {
      const startX = canvas!.width * (0.5 + Math.random() * 0.5);
      const startY = Math.random() * canvas!.height * 0.3;
      const speed = 6 + Math.random() * 4;
      const angle = Math.PI * (0.6 + Math.random() * 0.15);
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 30,
        length: 60 + Math.random() * 40,
      });
    }

    let raf: number;

    function render() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      const time = frame * 0.016;

      ctx.clearRect(0, 0, w, h);

      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const opacity = star.baseOpacity * twinkle;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }

      frame++;
      nextSpawn--;
      if (nextSpawn <= 0) {
        spawnShootingStar();
        nextSpawn = 300 + Math.random() * 300;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;

        if (s.life > s.maxLife) {
          shootingStars.splice(i, 1);
          continue;
        }

        const progress = s.life / s.maxLife;
        const headOpacity = progress < 0.1 ? progress / 0.1 : 1 - (progress - 0.1) / 0.9;

        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * (s.length / Math.sqrt(s.vx * s.vx + s.vy * s.vy)),
          s.y - s.vy * (s.length / Math.sqrt(s.vx * s.vx + s.vy * s.vy))
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${headOpacity * 0.9})`);
        grad.addColorStop(0.3, `rgba(99, 102, 241, ${headOpacity * 0.5})`);
        grad.addColorStop(1, "rgba(99, 102, 241, 0)");

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        const trailLen = s.length * Math.min(1, s.life / 10);
        const norm = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        ctx.lineTo(
          s.x - (s.vx / norm) * trailLen,
          s.y - (s.vy / norm) * trailLen
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${headOpacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("startWarp", onStartWarp);
      window.removeEventListener("endWarp", onEndWarp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

export default function Home() {
  const [station, setStation] = useState("home");
  const [transitioning, setTransitioning] = useState(false);

  const navigateTo = useCallback((newStation: string) => {
    if (newStation === station || transitioning) return;
    setTransitioning(true);

    gsap.to("[data-station-content]", {
      opacity: 0,
      y: -30,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        window.dispatchEvent(new Event("startWarp"));

        setTimeout(() => {
          window.dispatchEvent(new Event("endWarp"));
          setStation(newStation);
          setTransitioning(false);
        }, 800);
      },
    });
  }, [station, transitioning]);

  useEffect(() => {
    gsap.fromTo(
      "[data-station-content]",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [station]);

  return (
    <GeoBlock>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hudScanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
        @keyframes hudGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes hudDraw {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
      `}} />

      {/* Fixed particle background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 200 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: false }}
        >
          <Scene3D />
        </Canvas>
      </div>

      {/* Shooting stars */}
      <ShootingStarsCanvas />

      {/* Station content */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        paddingBottom: "32px",
      }}>
        <div
          data-station-content
          style={{
            pointerEvents: "auto",
            width: "100%",
            maxWidth: "720px",
            padding: "0 24px 0 100px",
            maxHeight: "calc(100vh - 80px)",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(129,140,248,0.2) transparent",
          }}
        >
          {station === "home" && <HomeStation />}
          {station === "about" && <AboutStation />}
          {station === "experience" && <ExperienceStation />}
          {station === "projects" && <ProjectsStation />}
          {station === "personal" && <PersonalStation />}
          {station === "contact" && <ContactStation />}
        </div>
      </div>

      {/* Cockpit Frame Overlay */}
      <CockpitFrame station={station} onNavigate={navigateTo} />


      {/* Film grain */}
      <div className="grain-overlay" />
    </GeoBlock>
  );
}
