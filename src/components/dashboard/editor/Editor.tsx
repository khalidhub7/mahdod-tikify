"use client";

import { Toolbar } from "./Toolbar";
import { Ratio } from "lucide-react";
import type { Widget, Overlay } from "@/types";
import { clampWidget } from "./editor-helpers";
import { WidgetLibrary } from "./WidgetLibrary";
import { EditorSettings } from "./EditorSettings";
import { DEFAULT_WIDGET_SIZE } from "./editor-constants";
import { EditorCanvas, useFitScale } from "./EditorCanvas";
import { useCallback, useEffect, useId, useState } from "react";

type Ratio = keyof typeof RESOLUTIONS;
const RESOLUTIONS = {
  "16/9": { width: 1920, height: 1080, label: "Landscape (16:9)" },
  "9/16": { width: 1080, height: 1920, label: "Portrait (9:16)" },
  "1/1": { width: 1080, height: 1080, label: "Square (1:1)" },
};
/* return like

[
  { value: "16/9", label: "Landscape (16:9)" },
  ...
]

*/
const RATIO_OPTIONS = (Object.keys(RESOLUTIONS) as Ratio[]).map((value) => {
  return {
    value,
    label: RESOLUTIONS[value].label,
  };
});

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
  const [background, setBackground] = useState("transparent");
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);

  const canvasSize = RESOLUTIONS[ratio];
  const { stageRef, scale } = useFitScale(canvasSize.width, canvasSize.height);

  const addWidget = useCallback(
    (component: WidgetType, x = 100, y = 100) => {
      const widget = clampWidget(
        { id: crypto.randomUUID(), component, x, y, ...DEFAULT_WIDGET_SIZE },
        canvasSize,
      );

      setWidgets((current) => [...current, widget]);
      setSelectedId(widget.id);
      setIsDirty(true);
    },
    [canvasSize],
  );

  const updateWidget = useCallback(
    (id: string, values: Partial<Widget>) => {
      setWidgets((current) =>
        current.map((widget) =>
          widget.id === id
            ? clampWidget({ ...widget, ...values }, size)
            : widget,
        ),
      );
      setIsDirty(true);
    },
    [size],
  );

  const deleteWidget = useCallback((id: string) => {
    setWidgets((current) => current.filter((widget) => widget.id !== id));
    setSelectedId((current) => (current === id ? null : current));
    setIsDirty(true);
  }, []);

  const updateOverlay = (values: Partial<Overlay>) => {
    const next = { ...overlay, ...values };

    setOverlay(next);
    // keep widgets inside when the resolution changes
    setWidgets((current) =>
      current.map((widget) => clampWidget(widget, RESOLUTIONS[next.ratio])),
    );
    setIsDirty(true);
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

    const component = event.dataTransfer.getData("application/widget");
    if (!isWidgetType(component)) return;

    // the rect is scaled, so convert screen pixels back to logical pixels
    const bounds = event.currentTarget.getBoundingClientRect();

    addWidget(
      component,
      (event.clientX - bounds.left) / scale - DEFAULT_WIDGET_SIZE.w / 2,
      (event.clientY - bounds.top) / scale - DEFAULT_WIDGET_SIZE.h / 2,
    );
  };

  // delete the selected widget with the Delete or Backspace key
  useEffect(() => {
    if (!selectedId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("input, select, textarea")) return;

      if (event.key === "Delete" || event.key === "Backspace") {
        deleteWidget(selectedId);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId, deleteWidget]);

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
          background={background}
          widgets={widgets}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onUpdate={updateWidget}
          onDrop={handleDrop}
          stageRef={stageRef}
          scale={scale}
        />

        <EditorSettings
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
