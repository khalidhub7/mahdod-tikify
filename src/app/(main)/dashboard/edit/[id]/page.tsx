const metadata = {
  title: "Edit overlay",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

const EditOverlay = async ({ params }: Props) => {
  const { id } = await params;

  return <p>Overlay ID: {id}</p>;
};

export { metadata };
export default EditOverlay;
