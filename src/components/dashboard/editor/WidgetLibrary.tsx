"use client";

import { WIDGETS } from "./editor-constants";
import type { WidgetType } from "./editor-types";

type WidgetLibraryProps = {
  onAddWidget: (component: WidgetType) => void;
};

const WidgetLibraryItem = ({
  type,
  label,
  icon: Icon,
  onAddWidget,
}: {
  type: WidgetType;
  label: string;
  icon: (typeof WIDGETS)[number]["icon"];
  onAddWidget: (component: WidgetType) => void;
}) => (
  <button
    type="button"
    draggable
    onDragStart={(event) =>
      event.dataTransfer.setData("application/widget", type)
    }
    onClick={() => onAddWidget(type)}
    className={`
      p-fluid-4 text-fluid-sm md:w-full
      flex items-center gap-fluid-4
      rounded-lg border

      hover:border-pink-400 hover:bg-pink-50/50
      dark:hover:bg-pink-950/20
    `}
  >
    <Icon className="size-fluid-icon-lg text-pink-500" aria-hidden="true" />
    {label}
  </button>
);

export const WidgetLibrary = ({ onAddWidget }: WidgetLibraryProps) => (
  /* Widget library */
  <aside
    className={`
      overflow-auto p-fluid-4 md:p-fluid-5
      scrollbar-thin scrollbar-thumb-pink-300
      border-b md:border-b-0 md:border-r
    `}
  >
    {/* title */}
    <h2 className="hidden md:block mb-fluid-4 text-fluid-sm font-semibold">
      Widgets
    </h2>

    {/* widgets list */}
    <div className="flex md:flex-col gap-fluid-3">
      {WIDGETS.map(({ type, label, icon }) => (
        <WidgetLibraryItem
          key={type}
          type={type}
          label={label}
          icon={icon}
          onAddWidget={onAddWidget}
        />
      ))}
    </div>
  </aside>
);
