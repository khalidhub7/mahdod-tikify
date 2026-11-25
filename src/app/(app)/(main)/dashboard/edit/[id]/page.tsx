import { Editor } from "@/components/dashboard/Editor";

const metadata = {
  title: "Edit overlay",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

const EditOverlay = async ({ params }: Props) => {
  const { id } = await params;

  return <Editor overlayId={id} />;
};

export { metadata };
export default EditOverlay;