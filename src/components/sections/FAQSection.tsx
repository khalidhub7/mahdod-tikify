import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/scrollxui/accordion";

// FAQ Section
const FAQSection = () => {
  return (
    <section className="bg-amber-100">
      <header></header>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export { FAQSection };
