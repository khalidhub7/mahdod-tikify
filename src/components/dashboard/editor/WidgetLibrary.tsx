"use client";

import { WidgetRegistryItem, WIDGETS, WidgetType } from "./editor-constants";

type WidgetLibraryProps = {
  onAddWidget: (
    type: WidgetType,
    item: WidgetRegistryItem,
    x?: number,
    y?: number,
  ) => void;
};

type WidgetLibraryItemProps = {
  type: WidgetType;
  item: WidgetRegistryItem;
  onAddWidget: (
    type: WidgetType,
    item: WidgetRegistryItem,
    x?: number,
    y?: number,
  ) => void;
};

const WidgetLibraryItem = ({
  type,
  item,
  onAddWidget,
}: WidgetLibraryItemProps) => {
  const Comp = item.component;
  const widget = { type, item } satisfies {
    type: WidgetType;
    item: WidgetRegistryItem;
  };

  return (
    <button
      type="button"
      draggable
      onDragStart={(event) =>
        event.dataTransfer.setData("application/widget", JSON.stringify(widget))
      }
      onClick={() => onAddWidget(type, item)}
      className={`
        p-fluid-4 text-fluid-sm md:w-full
        flex items-center gap-fluid-4
        rounded-lg border
      
        hover:border-pink-400 hover:bg-pink-50/50
        dark:hover:bg-pink-950/20
        `}
    >
      <Comp />
    </button>
  );
};

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
      {(Object.entries(WIDGETS) as [WidgetType, WidgetRegistryItem][]).map(
        ([type, item]) => (
          <WidgetLibraryItem
            key={type}
            type={type}
            item={item}
            onAddWidget={onAddWidget}
          />
        ),
      )}
    </div>
  </aside>
);
