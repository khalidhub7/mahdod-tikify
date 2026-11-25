import Link from "next/link";
import { Suspense } from "react";
import { Overlay } from "@/types";
import { redirect } from "next/navigation";
import { LayersIcon, MoreHorizontalIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DropdownMenu } from "@/components/ui/shadcn/dropdown-menu";
import { VerificationToast } from "@/components/auth/VerificationToast";
import { DropdownMenuItem } from "@/components/ui/shadcn/dropdown-menu";
import { Table, TableBody, TableCell } from "@/components/ui/shadcn/table";
import { DropdownMenuContent } from "@/components/ui/shadcn/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/shadcn/dropdown-menu";
import { DropdownMenuSeparator } from "@/components/ui/shadcn/dropdown-menu";
import { TableHead, TableHeader, TableRow } from "@/components/ui/shadcn/table";
import { CreateOverlayDialog } from "@/components/dashboard/CreateOverlayDialog";
import { ToggleOverlaySwitch } from "@/components/dashboard/ToggleOverlaySwitch";
import { DeleteOverlayButton } from "@/components/dashboard/DeleteOverlayButton";
import { CopyOverlayUrlButton } from "@/components/dashboard/CopyOverlayUrlButton";

const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const Dashboard = async () => {
  // helpers
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date));

  // auth
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login?redirect=/dashboard");

  // get overlays
  const { data: overlays, error: overlaysError } = await supabase
    .from("overlays")
    .select(
      "name, tiktok_username, id, user_id, is_active, created_at, updated_at",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // handlers

  return (
    <>
      {/* email-verify toaster */}
      <Suspense fallback={null}>
        <VerificationToast />
      </Suspense>

      <div
        className={`
          min-h-screen m-fluid-5 overflow-hidden rounded-xl
          ring-1 ring-pink-300/60 
          dark:ring-foreground/20
          
          shadow-[0_0_24px_rgba(249,168,212,0.35)]
          dark:shadow-[0_0_24px_rgba(255,255,255,0.08)]
          `}
      >
        {/* dashboard header */}
        <div
          className={`
            px-fluid-6 py-fluid-5
            flex items-center justify-between
            border-b border-pink-300/40 dark:border-foreground/20
            `}
        >
          <div className="space-y-fluid-3">
            <h1 className="text-fluid-xl font-semibold tracking-tight text-foreground">
              Your Overlays
            </h1>
            <p className="text-fluid-sm text-muted-foreground">
              Create and manage your live TikTok overlays
            </p>
          </div>
          <CreateOverlayDialog />
        </div>

        {/* content */}
        {overlaysError || !overlays || overlays.length === 0 ? (
          <div
            className={`
              h-[50vh] flex flex-col items-center justify-center gap-fluid-5
              `}
          >
            <div
              className={`
                size-fluid-7 rounded-full border
                flex items-center justify-center
                `}
            >
              <LayersIcon className="size-6 text-pink-500 dark:text-foreground/20" />
            </div>
            <p className="text-center text-muted-foreground text-fluid-base">
              You haven&apos;t created any overlays yet.
            </p>
            <p className="text-center text-fluid-sm text-muted-foreground/70 max-w-xs">
              Create your first overlay to get started.
            </p>
          </div>
        ) : (
          <div className="p-fluid-5 md:p-fluid-6">
            <Table
              className={`
                w-full max-w-4xl mx-auto rounded-lg overflow-hidden
                border border-pink-200/50 dark:border-pink-800/40 shadow-sm
                `}
            >
              <TableHeader>
                <TableRow
                  className={`
                    bg-pink-50/50 dark:bg-pink-950/30 hover:bg-pink-50/50
                    dark:hover:bg-pink-950/30
                    border-b border-pink-200/40 dark:border-pink-800/40
                    `}
                >
                  <TableHead className="pl-5 py-3.5 font-medium text-foreground/80">
                    Overlay
                  </TableHead>
                  <TableHead className="py-3.5 font-medium text-foreground/80">
                    Controls
                  </TableHead>
                  <TableHead className="text-right pr-5 py-3.5 font-medium text-foreground/80">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {overlays.map((overlay: Overlay) => (
                  <TableRow
                    key={overlay.id}
                    className={`
                      group border-b border-pink-100/60 dark:border-pink-900/40
                      last:border-0 hover:bg-pink-50/30 dark:hover:bg-pink-950/20
                      transition-colors
                      `}
                  >
                    <TableCell className="pl-5 py-5 align-middle">
                      <div className="space-y-1.5">
                        <p
                          className={`
                            font-medium text-blue-600 dark:text-blue-400
                            group-hover:text-blue-700 dark:group-hover:text-blue-300
                            transition-colors
                            `}
                        >
                          {overlay.name}
                        </p>
                        <p className="text-fluid-sm text-pink-600/90 dark:text-pink-400/90">
                          {overlay.tiktok_username}
                        </p>
                        <p className="text-fluid-xs text-foreground/50 dark:text-foreground/40 pt-0.5">
                          Created {formatDate(overlay.created_at)}
                          <span className="mx-1.5 text-foreground/30 dark:text-foreground/25">
                            ·
                          </span>
                          Edited {formatDate(overlay.updated_at)}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="py-5 align-middle">
                      <div className="flex items-center gap-3">
                        <CopyOverlayUrlButton slug={overlay.id} />
                        <ToggleOverlaySwitch
                          id={overlay.id}
                          initialActive={overlay.is_active}
                        />
                      </div>
                    </TableCell>

                    <TableCell className="text-right pr-5 py-5 align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={`
                            flex items-center justify-center rounded-md
                            size-8 text-muted-foreground hover:text-foreground
                            hover:bg-pink-100/60 dark:hover:bg-pink-900/40
                            `}
                        >
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            render={
                              <Link href={`/dashboard/edit/${overlay.id}`}>
                                Edit overlay
                              </Link>
                            }
                          />
                          {/* <DropdownMenuItem>Duplicate</DropdownMenuItem> */}
                          <DropdownMenuSeparator />
                          <DeleteOverlayButton id={overlay.id} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export { metadata };
export default Dashboard;
