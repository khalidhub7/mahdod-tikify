import { Button } from "@/components/ui/shadcn/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CopyOverlayUrlButton } from "@/components/dashboard/CopyOverlayUrlButton";

const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

// test data
const overlays = [
  {
    id: "a7f3c912-8b4e-4d21-9f65-2c8a1e7b3046",
    name: "Overlay 1",
    widgetCount: 3,
    createdAt: "2026-10-10T09:30:00.000Z",
    updatedAt: "2026-10-12T14:20:00.000Z",
  },
  {
    id: "b2e8d451-6c9a-4f73-a815-3d7b9e2046c2",
    name: "Overlay 2",
    widgetCount: 3,
    createdAt: "2026-10-11T11:00:00.000Z",
    updatedAt: "2026-10-15T16:45:00.000Z",
  },
  {
    id: "c9d1a634-2f87-4b50-8e23-6a4c1d9f7058",
    name: "Overlay 3",
    widgetCount: 2,
    createdAt: "2026-10-14T08:15:00.000Z",
    updatedAt: "2026-10-14T08:15:00.000Z",
  },
  {
    id: "d4b6e820-1a93-47c5-bf62-8e3d0a7194c6",
    name: "Overlay 4",
    widgetCount: 4,
    createdAt: "2026-10-16T13:00:00.000Z",
    updatedAt: "2026-10-18T10:30:00.000Z",
  },
];

const Dashboard = () => {
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date));

  return (
    <div
      className={`
        min-h-screen my-fluid-4 mx-fluid-5 space-y-fluid-5
        rounded-md ring ring-ring/25
        `}
    >
      {/* dashboard header */}
      <div
        className={`
        h-fluid-7
        flex items-center justify-end px-fluid-6
        `}
      >
        <Button size={"lg"} className={`cursor-pointer`}>
          <Plus aria-hidden="true" />
          New overlay
        </Button>
      </div>

      {/* content */}
      {/* list of overlays */}
      <ul
        className={`shadow rounded-md divide-y md:w-4/6 md:mx-auto `}
      >
        {overlays.map((overlay) => (
          <li
            key={overlay.id}
            className={`
              px-fluid-5 py-fluid-4
              flex flex-col sm:flex-row
              gap-fluid-5 justify-between
              transition-colors hover:bg-muted/60 dark:hover:bg-muted/20
              `}
          >
            <div className="space-y-1">
              <h2
                className={`
                  tracking-wide
                  font-semibold text-blue-500 dark:text-blue-400
                  `}
              >
                {overlay.name}
              </h2>

              <p className="text-sm text-muted-foreground">
                {overlay.widgetCount}{" "}
                {overlay.widgetCount === 1 ? "widget" : "widgets"}
              </p>

              <p className="text-xs text-muted-foreground">
                Created {formatDate(overlay.createdAt)} · Edited{" "}
                {formatDate(overlay.updatedAt)}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <CopyOverlayUrlButton slug={overlay.id} />
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
                render={
                  <Link href={`/dashboard/edit/${overlay.id}`}>
                    Edit overlay
                  </Link>
                }
              ></Button>

              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="cursor-pointer"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { metadata };
export default Dashboard;
