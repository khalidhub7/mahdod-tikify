import { Toaster } from "@/components/ui/shadcn/toast";

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default AppLayout;
