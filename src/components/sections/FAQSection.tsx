"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";

// data
const questions = [
  {
    id: 1,
    question: "What is this app?",
    answer:
      "It's a web-based overlay builder that lets you create, customize, and manage all your livestream widgets from one dashboard. Simply add a single Browser Source to OBS and everything works together.",
  },
  {
    id: 2,
    question: "Do I need to install any software?",
    answer:
      "No. Everything runs directly in your browser. There are no downloads, installers, or desktop applications required.",
  },
  {
    id: 3,
    question: "Does it work with OBS?",
    answer:
      "Yes. Copy your generated overlay URL, add it as a Browser Source in OBS, and all of your widgets will appear in one place.",
  },
  {
    id: 4,
    question: "Why use one Browser Source?",
    answer:
      "Managing a single Browser Source keeps your OBS scenes cleaner, reduces resource usage, and makes your setup much easier to maintain.",
  },
  {
    id: 5,
    question: "Can I customize my widgets?",
    answer:
      "Absolutely. Drag, resize, reposition, and personalize every widget with custom fonts, colors, animations, spacing, and behavior.",
  },
  {
    id: 6,
    question: "Are my layouts and settings saved?",
    answer:
      "Yes. Everything is securely stored in your account, so your overlays and settings stay synchronized across all your devices.",
  },
];

const FAQSection = () => {
  const [openId, setOpenId] = useState<number>(2);

  return (
    <section aria-labelledby="faq-section" className="section">
      {/* header */}
      <header className="section-header">
        <h2 id="faq-section" className="section-title">
          Frequently Asked Questions
        </h2>
      </header>

      {/* content */}
      <div className="section-content">
        <p className="section-subtitle">
          Everything you need to know before going live.
        </p>

        <div
          className={`
            grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-fluid-7
            max-w-6xl place-items-center
            `}
        >
          <div className="relative aspect-square w-full max-w-md lg:max-w-xl">
            <Image
              src="/faq.svg"
              fill
              alt="Illustration of frequently asked questions"
              /*
              Next.js automatically skips optimization for .svg sources,
              so sizes has no practical benefit here.
              sizes="(max-width: 768px) 90vw, 40vw"
              */
              className="object-contain"
            />
          </div>

          <ul className="space-y-fluid-5 pl-fluid-7">
            {questions.map((q) => {
              const isOpen = openId === q.id;
              const Icon = isOpen ? Minus : Plus;

              return (
                <li key={q.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${q.id}`}
                    className="group flex items-center cursor-pointer gap-fluid-3"
                    onClick={() => setOpenId(q.id)}
                  >
                    <Icon
                      aria-hidden
                      className={`
                        size-fluid-icon-lg text-blue-500 dark:text-blue-400
                        transition-transform duration-500 group-hover:rotate-180
                        `}
                    />

                    <span className="font-medium tracking-wide">
                      {q.question}
                    </span>
                  </button>

                  <motion.div
                    id={`faq-answer-${q.id}`}
                    inert={!isOpen}
                    className="overflow-hidden"
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                      x: isOpen ? 0 : 20,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <p
                      className={`
                        text-fluid-base text-foreground/80
                        ml-fluid-6 mt-fluid-4 max-w-4/5 rounded p-fluid-4
                        [word-spacing:clamp(1px,0.5vw,5px)]
                        border
                        `}
                    >
                      {q.answer}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { FAQSection };
