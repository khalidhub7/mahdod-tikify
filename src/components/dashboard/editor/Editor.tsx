"use client";

import { Toolbar } from "./Toolbar";
import type { Widget, Overlay } from "@/types";
import { clampWidget } from "./editor-helpers";
import { WidgetLibrary } from "./WidgetLibrary";
import type { WidgetRegistryItem, Ratio, WidgetType } from "./editor-constants";
import { EditorSettings } from "./EditorSettings";
import { EditorCanvas, useFitScale } from "./EditorCanvas";
import { useCallback, useEffect, useId, useState } from "react";
import { RESOLUTIONS } from "./editor-constants";

/* return like

[
  { value: "16/9", label: "Landscape (16:9)" },
  ...
]

*/

// right imports

type EditorProps = {
  overlay: Overlay;
  initialWidgets: Array<Widget>;
};

const Editor = ({ overlay, initialWidgets }: EditorProps) => {
  // states
  const settingsId = useId();
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [ratio, setRatio] = useState<Ratio>("16/9");
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);

  const renderedWidgets = new Map();
  const canvasSize = RESOLUTIONS[ratio];
  const { stageRef, scale } = useFitScale(canvasSize.width, canvasSize.height);

  const addWidget = useCallback(
    (type: WidgetType, item: WidgetRegistryItem, x = 200, y = 200) => {
      const widget: Widget = clampWidget(
        {
          id: crypto.randomUUID(),
          widget_type: type,
          x,
          y,
          ...item.defaultSize,
        },
        canvasSize,
      );

      renderedWidgets.set(type, item.component);
      setWidgets((current) => [...current, widget]);
      setSelectedWidget(widget);
      setIsDirty(true);
    },
    [canvasSize],
  );

  const updateWidget = useCallback(
    (id: string, values: Partial<Widget>) => {
      setWidgets((widgets) => {
        return widgets.map((widget) => {
          if (widget.id !== id) return widget;

          const updated = clampWidget({ ...widget, ...values }, canvasSize);
          setSelectedWidget(updated);
          return updated;
        });
      });

      setIsDirty(true);
    },
    [canvasSize],
  );

  const deleteWidget = useCallback((id: string) => {
    setSelectedWidget((current) => (current?.id === id ? null : current));
    setWidgets((current) => current.filter((widget) => widget.id !== id));
    setIsDirty(true);
  }, []);

  const updateOverlay = (ratio?: Ratio) => {
    let updated = false;
    if (ratio) {
      setRatio(ratio);
      updated = true;
    }
    // keep widgets inside when the resolution changes
    if (updated) {
      setWidgets((current) =>
        current.map((widget) =>
          clampWidget(widget, RESOLUTIONS[ratio as Ratio]),
        ),
      );
      setIsDirty(true);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // TODO: send { ratio, background, widgets } to an API route (validate with zod),
      // then mark as saved only after the request succeeds
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (scale === null) return;

    const widget = JSON.parse(
      event.dataTransfer.getData("application/widget"),
    ) as { type: WidgetType; item: WidgetRegistryItem };

    // the rect is scaled, so convert screen pixels back to logical pixels
    const bounds = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - bounds.left) / scale - widget.item.defaultSize.w / 2;
    const y =
      (event.clientY - bounds.top) / scale - widget.item.defaultSize.h / 2;

    addWidget(widget.type, widget.item, x, y);
  };

  // delete the selected widget with the Delete or Backspace key
  useEffect(() => {
    if (!selectedWidget) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("input, select, textarea")) return;

      if (event.key === "Delete" || event.key === "Backspace") {
        deleteWidget(selectedWidget.id);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedWidget, deleteWidget]);

  // warn before leaving with unsaved changes
  useEffect(() => {
    if (!isDirty) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  return (
    // dvh keeps the editor inside the visible viewport on mobile browsers
    <div
      className={`
        min-h-[calc(100dvh-4rem)] rounded-xl overflow-hidden
        flex flex-col border bg-background
        `}
    >
      <Toolbar
        overlayId={overlay.id}
        isDirty={isDirty}
        isSaving={isSaving}
        onSave={handleSave}
      />

      {/* Editor panels */}
      <div
        className={`
          grid grid-cols-1 flex-1
          md:grid-cols-[2fr_5fr] lg:grid-cols-[1fr_3fr_1fr]
          `}
      >
        <WidgetLibrary onAddWidget={addWidget} />

        <EditorCanvas
          size={canvasSize}
          widgets={widgets}
          selectedId={selectedWidget}
          onSelect={setSelectedWidget}
          onUpdate={updateWidget}
          onDrop={handleDrop}
          stageRef={stageRef}
          scale={scale}
        />

        <EditorSettings
          ratio={ratio}
          settingsId={settingsId}
          overlay={overlay}
          selectedWidget={selectedWidget}
          size={canvasSize}
          onUpdateOverlay={updateOverlay}
          onUpdateWidget={updateWidget}
          onDeleteWidget={deleteWidget}
        />
      </div>
    </div>
  );
};

export { Editor };
