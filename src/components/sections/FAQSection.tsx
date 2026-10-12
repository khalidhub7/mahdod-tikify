"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ---------------------------------- Data ---------------------------------- */

const questions = [
  {
    id: "what-is-this-app",
    question: "What is this app?",
    answer:
      "It's a web-based overlay builder that lets you create, customize, and manage all your livestream widgets from one dashboard. Simply add a single Browser Source to OBS and everything works together.",
  },
  {
    id: "install-software",
    question: "Do I need to install any software?",
    answer:
      "No. Everything runs directly in your browser. There are no downloads, installers, or desktop applications required.",
  },
  {
    id: "obs-support",
    question: "Does it work with OBS?",
    answer:
      "Yes. Copy your generated overlay URL, add it as a Browser Source in OBS, and all of your widgets will appear in one place.",
  },
  {
    id: "single-browser-source",
    question: "Why use one Browser Source?",
    answer:
      "Managing a single Browser Source keeps your OBS scenes cleaner, reduces resource usage, and makes your setup much easier to maintain.",
  },
  {
    id: "customization",
    question: "Can I customize my widgets?",
    answer:
      "Absolutely. Drag, resize, reposition, and personalize every widget with custom fonts, colors, animations, spacing, and behavior.",
  },
  {
    id: "saved-layouts",
    question: "Are my layouts and settings saved?",
    answer:
      "Yes. Everything is securely stored in your account, so your overlays and settings stay synchronized across all your devices.",
  },
];

/* ------------------------------ Style tokens ------------------------------ */
/* All clamps synced to 640–960px range. Verified at endpoints. */

const accordionItemStyles = cn(
  "overflow-hidden rounded-xl border border-transparent",
  "transition-colors duration-200",
  "data-[open]:border-border data-[open]:bg-background/50",
);

const questionButtonStyles = cn(
  "flex w-full cursor-pointer items-center justify-between gap-3",
  "rounded-xl px-[clamp(0.85rem,2vw_+_0.05rem,1.25rem)] py-[clamp(0.75rem,1.25vw_+_0.25rem,1rem)]",
  "text-left font-medium",
  "hover:bg-foreground/5",
  "transition-colors duration-200",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400",
);

const answerPanelStyles = cn(
  "px-[clamp(0.85rem,2vw_+_0.05rem,1.25rem)] pb-[clamp(0.85rem,2vw_+_0.05rem,1.25rem)]",
  "pl-[clamp(2rem,3vw_+_0.8rem,2.6rem)]",
  "text-sm leading-relaxed text-foreground/70",
);

/* ------------------------------ Sub-components ----------------------------- */

const SectionHeader = () => (
  <div className="section-header flex flex-col items-center text-center">
    <header>
      <h2 className="section-title text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
        Frequently Asked Questions
      </h2>
    </header>
    <p className="section-subtitle mt-2 text-foreground/60">
      Everything you need to know before going live.
    </p>
  </div>
);

const FaqIllustration = () => (
  <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-xl">
    <Image
      src="/faq.svg"
      fill
      alt="Illustration of frequently asked questions"
      sizes="(max-width: 768px) 90vw, 40vw"
      className="object-contain"
    />
  </div>
);

/** Animated answer panel — expands/collapses with smooth height tween. */
const AnswerPanel = ({ id, answer }: { id: string; answer: string }) => (
  <motion.div
    id={`${id}-panel`}
    role="region"
    aria-labelledby={`${id}-button`}
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
  >
    <p className={answerPanelStyles}>{answer}</p>
  </motion.div>
);

interface FaqItemProps {
  item: (typeof questions)[number];
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem = ({ item, isOpen, onToggle }: FaqItemProps) => (
  <li className={accordionItemStyles} data-open={isOpen || undefined}>
    <h3>
      <button
        id={`${item.id}-button`}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
        className={questionButtonStyles}
      >
        <span className="text-sm sm:text-base">{item.question}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 shrink-0 text-blue-500 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>
    </h3>

    <AnimatePresence initial={false}>
      {isOpen && <AnswerPanel id={item.id} answer={item.answer} />}
    </AnimatePresence>
  </li>
);

/* -------------------------------- Component -------------------------------- */

const FAQSection = () => {
  /** `null` = all closed; clicking the open item collapses it. */
  const [openId, setOpenId] = useState<string | null>(questions[0].id);

  const toggle = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

  return (
    <section className="section">
      <SectionHeader />

      <div
        className={cn(
          "mx-auto grid max-w-6xl grid-cols-1 items-center",
          "gap-[clamp(2rem,10vw_-_2rem,4rem)] lg:grid-cols-[5fr_7fr]",
        )}
      >
        <FaqIllustration />

        <ul className="flex w-full flex-col gap-2">
          {questions.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export { FAQSection };
