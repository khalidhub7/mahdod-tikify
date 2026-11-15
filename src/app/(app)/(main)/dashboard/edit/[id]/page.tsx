const metadata = {
  title: "Edit overlay",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

// todo: invalid uuid / overlay_id

const EditOverlay = async ({ params }: Props) => {
  const { id } = await params;

  return <p>Overlay ID: {id}</p>;
};

export { metadata };
export default EditOverlay;
