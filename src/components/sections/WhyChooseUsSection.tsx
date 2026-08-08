import { Plus } from "lucide-react";

const features = [
  {
    id: 1,
    description:
      "Run every widget from a single overlay URL inside OBS for a cleaner setup.",
  },
  {
    id: 2,
    description:
      "Save RAM and CPU by using one Browser Source instead of multiple overlays.",
  },
  {
    id: 3,
    description:
      "Enjoy responsive animations with no lag or stuttering when events arrive.",
  },
  {
    id: 4,
    description:
      "Changes appear instantly without restarting OBS or refreshing your scene.",
  },
  {
    id: 5,
    description:
      "Quickly arrange, resize, and customize widgets using an intuitive editor.",
  },
  {
    id: 6,
    description:
      "Your layouts and settings stay backed up and synchronized across devices.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="section">
      <header className="section-header">
        <h3
          className="
          section-title
          text-transparent
          bg-clip-text bg-linear-to-r from-blue-500 to-purple-500
          "
        >
          Why Choose Us
        </h3>
      </header>

      <ul
        className="
        grid grid-cols-1 md:grid-cols-2
        p-10 gap-5
        "
      >
        {features.map((f) => (
          <li
            key={f.id}
            className="
            bg-diagonal
            p-4 font-playpen rounded-xl
            text-sm font-semibold
            ring-4  ring-gray-50
            ring-offset-2 ring-offset-gray-100
            dark:ring-gray-800 dark:ring-offset-gray-700
            "
          >
            <Plus className="inline mr-2 size-4" />
            {f.description}
          </li>
        ))}
      </ul>
    </section>
  );
};

export { WhyChooseUsSection };
