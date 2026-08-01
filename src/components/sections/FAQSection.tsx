import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/scrollxui/accordion";

const questions = [
  {
    id: 1,
    question: "What is this app?",
    answer:
      "It's a web-based overlay builder that lets you create, customize, and manage all your livestream widgets from a single dashboard. You only need one Browser Source in OBS.",
  },
  {
    id: 2,
    question: "Do I need to install any software?",
    answer:
      "No. Everything runs in your browser. There is no desktop application to download or install.",
  },
  {
    id: 3,
    question: "Does it work with OBS?",
    answer:
      "Yes. Simply add your generated overlay URL as a Browser Source in OBS, and all your widgets will appear together.",
  },
  {
    id: 4,
    question: "Why use one Browser Source?",
    answer:
      "Instead of managing multiple Browser Sources for different widgets, everything is combined into one overlay, making your OBS setup cleaner and easier to manage.",
  },
  {
    id: 5,
    question: "Can I customize my widgets?",
    answer:
      "Yes. You can drag, resize, reposition, and customize each widget's appearance, animations, fonts, colors, and behavior.",
  },
  {
    id: 6,
    question: "Are my layouts and settings saved?",
    answer:
      "Yes. Your account securely saves your overlays, widgets, layouts, and preferences, so you can access them from any device.",
  },
];

// FAQ Section
const FAQSection = () => {
  return (
    <section
      className="
    grid grid-cols-1 md:grid-cols-2
    section
    "
    >
      <header className="section-header">Frequently Asked Questions</header>
      <Accordion type="single" collapsible>
        {questions.map((q) => (
          <AccordionItem value={`item-${q.id}`} key={q.id}>
            <AccordionTrigger>{q.question}</AccordionTrigger>
            <AccordionContent>{q.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export { FAQSection };
