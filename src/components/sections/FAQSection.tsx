"use client";

import { HelpCircle, Mail, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/scrollxui/accordion";
import { motion, type Variants } from "motion/react";

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

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.06,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4, ease: "easeOut" } },
};

// Chamfered corner clip-path (8px cut)
const clipPath =
  "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

const FAQSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-10 lg:py-14">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[300px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Side */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-4 lg:sticky lg:top-24 self-start"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1">
              <HelpCircle className="size-3 text-blue-600" />
              <span className="text-[11px] font-medium text-blue-600">
                FAQ
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Got Questions?
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                We've Got Answers.
              </span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Find answers to the most common questions about setting up your
              overlays, customizing widgets, and getting the best streaming
              experience.
            </p>

            <motion.a
              href="#contact"
              variants={ctaVariants}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-blue-500/20 transition-colors duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30"
            >
              <Mail className="size-3.5" />
              Contact Support
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </motion.div>

          {/* Right Side */}
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="space-y-3">
              {questions.map((q, index) => (
                <motion.div
                  key={q.id}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="group relative"
                >
                  {/* Outer wrapper with clip-path for the border */}
                  <div className="relative" style={{ clipPath }}>
                    {/* Border Background */}
                    <div className="absolute inset-0 bg-border transition-colors duration-300 group-hover:bg-blue-500/30 data-[state=open]:bg-blue-500/40" />

                    {/* Inner Content */}
                    <AccordionItem
                      value={`item-${q.id}`}
                      className="relative m-[1px] bg-card px-5 transition-all duration-300 group-hover:bg-card/90 data-[state=open]:bg-blue-500/[0.03]"
                    >
                      <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:no-underline">
                        <span className="transition-colors duration-300 group-hover:text-blue-600">
                          {q.question}
                        </span>
                      </AccordionTrigger>

                      <AccordionContent className="pb-4 text-xs leading-5 text-muted-foreground">
                        {q.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export { FAQSection };