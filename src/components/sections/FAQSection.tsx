"use client";
import Image from "next/image";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, LayoutGroup } from "motion/react";

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
  const [activeItem, setActiveItem] = useState(1);
  return (
    <section className="section" >
      {/* section header */}
      <header className="section-header  ">
        <h3
          className="
          section-title text-transparent
          bg-clip-text bg-linear-to-r from-blue-500 to-purple-500
          "
        >
          How It Works
        </h3>
      </header>
      {/* section content */}
      <div
        className="
        grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0
        place-items-center
        "
      >
        {/* faq image */}
        <div className="relative">
          <Image src="/faq.svg" width={600} height={600} alt="faq" />
        </div>
        {/* faq questions */}
        <LayoutGroup>
          <ul className=" flex flex-col justify-center gap-5 pl-10 md:pl-0">
            {questions.map((q) => (
              <motion.li key={q.id} className="list-none space-y-3" layout>
                <button
                  className="flex gap-2 cursor-pointer "
                  onClick={() => setActiveItem(q.id)}
                >
                  <span className="hover:rotate-180 transition-transform duration-200">
                    {activeItem === q.id ? (
                      <Minus className="text-blue-500" />
                    ) : (
                      <Plus className="text-blue-500" />
                    )}
                  </span>

                  <p>{q.question}</p>
                </button>

                {activeItem === q.id ? (
                  <p
                    className="
                    ml-8 rounded p-3 [word-spacing:5px] max-w-4/5
                    ring ring-brand-ring
                    "
                  >
                    {q.answer}
                  </p>
                ) : undefined}
              </motion.li>
            ))}
          </ul>
        </LayoutGroup>
      </div>
    </section>
  );
};

export { FAQSection };
