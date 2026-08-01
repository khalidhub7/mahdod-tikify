import { Zap } from "lucide-react";

const features = [
  {
    id: 1,
    text: "One Browser Source — All widgets in a single overlay URL.",
  },
  {
    id: 2,
    text: "Less Resource Usage — Uses less RAM and CPU by running only one Browser Source.",
  },
  {
    id: 3,
    text: "Smoother Performance — No lag or stuttering when gifts and events arrive.",
  },
  {
    id: 4,
    text: "Real-Time Updates — Changes appear instantly without restarting OBS.",
  },
  {
    id: 5,
    text: "Drag & Drop Dashboard — Add, move, resize, and customize widgets with ease.",
  },
  {
    id: 6,
    text: "Cloud Saved — Your layouts and settings are synced to your account.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="
    space-y-7
    ">
      <header
        className="
        section-header
        text-center md:text-start
        "
      >
        <h2 className="text-">Why Choose Us</h2>
      </header>
      <ul
        className="
        grid grid-cols-1 md:grid-cols-2 gap-y-4
        "
      >
        {features.map((f) => (
          <li className="flex gap-3 w-xl mx-auto">
            <Zap className="size-4 text-blue-600 mt-0.5 shrink-0" />
            <span className="text-foreground">{f.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { WhyChooseUsSection };
