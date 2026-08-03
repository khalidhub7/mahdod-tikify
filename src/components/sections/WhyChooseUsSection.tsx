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
      <header className="section-header">WhyChooseUs</header>

      <ul className="bg-amber-100">
        {features.map((f) => (
          <li
            key={f.id}
            className="
          bg-red-100"
          >
            {f.description}
          </li>
        ))}
      </ul>
    </section>
  );
};

export { WhyChooseUsSection };
