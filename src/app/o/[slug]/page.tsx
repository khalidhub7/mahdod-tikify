const metadata = {
  title: "Overlay",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

const Overlay = async ({ params }: Props) => {
  const { id } = await params;

  return <p>Overlay ID: {id}</p>;
};

export { metadata };
export default Overlay;
