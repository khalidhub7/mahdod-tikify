import { Toaster } from "sonner";

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <Toaster richColors position="top-center" />
    </>
  );
};

export default AppLayout;
