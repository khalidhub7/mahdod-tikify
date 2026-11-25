"use client";

import { Rnd } from "react-rnd";
import { cn } from "@/lib/utils";
import type { Widget } from "@/types";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";
import { Type, Clock, Target, Trash2 } from "lucide-react";
import { Layers, Monitor } from "lucide-react";

import { memo, useCallback, useEffect, useId, useRef, useState } from "react";

/* TYPES */

type WidgetType = "text" | "clock" | "username" | "goal";
type Ratio = keyof typeof RESOLUTIONS;
type Overlay = { ratio: Ratio; background: string };
type Size = { width: number; height: number };

type NumberFieldProps = {
  label: string;
  value: number;
  min: number;
  max?: number;
  onChange: (value: number) => void;
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
};

type WidgetItemProps = {
  widget: Widget;
  scale: number;
  selected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, values: Partial<Widget>) => void;
};

/* CONSTANTS */

const RESOLUTIONS = {
  "16/9": { width: 1920, height: 1080, label: "Landscape (16:9)" },
  "9/16": { width: 1080, height: 1920, label: "Portrait (9:16)" },
  "1/1": { width: 1080, height: 1080, label: "Square (1:1)" },
} as const;

const WIDGETS = [
  { type: "text", label: "Text", icon: Type },
  { type: "clock", label: "Clock", icon: Clock },
  { type: "username", label: "Username", icon: Type },
  { type: "goal", label: "Goal", icon: Target },
] as const;

const BACKGROUNDS = [
  { value: "transparent", label: "Transparent" },
  { value: "#000000", label: "Black" },
  { value: "#ffffff", label: "White" },
] as const;

const RATIO_OPTIONS = (Object.keys(RESOLUTIONS) as Ratio[]).map((value) => {
  return {
    value,
    label: RESOLUTIONS[value].label,
  };
});

const MIN_WIDGET_W = 100;
const MIN_WIDGET_H = 50;
const DEFAULT_WIDGET_SIZE = { w: 400, h: 120 };
const SELECT_CLASS =
  "w-full rounded-md border bg-background px-fluid-4 py-fluid-3 text-fluid-sm";

/* HELPERS */

const isWidgetType = (value: string): value is WidgetType =>
  WIDGETS.some((widget) => widget.type === value);

const isRatio = (value: string): value is Ratio => value in RESOLUTIONS;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

const clampWidget = (widget: Widget, size: Size): Widget => {
  const w = clamp(widget.w, MIN_WIDGET_W, size.width);
  const h = clamp(widget.h, MIN_WIDGET_H, size.height);

  return {
    ...widget,
    w,
    h,
    x: clamp(widget.x, 0, size.width - w),
    y: clamp(widget.y, 0, size.height - h),
  };
};

/* HOOKS */

const useFitScale = (width: number, height: number) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(([entry]) => {

      const { width: availW, height: availH } = entry.contentRect;
      if (availW === 0 || availH === 0) return;

      setScale(Math.min(availW / width, availH / height, 1));
    });

    observer.observe(stage);
    return () => observer.disconnect();

  }, [width, height]);

  return { stageRef, scale };
};

/* COMPONENTS */

const NumberField = ({
  label,
  value,
  min,
  max,
  onChange,
}: NumberFieldProps) => {
  const id = useId();
  const [draft, setDraft] = useState(String(value));
  const [previousValue, setPreviousValue] = useState(value);

  if (value !== previousValue) {
    setPreviousValue(value);
    setDraft(String(value));
  }

  const commit = () => {
    const next = Number(draft);

    if (draft.trim() === "" || Number.isNaN(next)) {
      setDraft(String(value));
      return;
    }

    onChange(clamp(Math.round(next), min, max ?? Infinity));
  };

  return (
    <div className="space-y-fluid-2">
      <Label htmlFor={id} className="text-fluid-sm">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") commit();
        }}
      />
    </div>
  );
};

const SelectField = ({ label, value, options, onChange }: SelectFieldProps) => {
  const id = useId();

  return (
    <div className="space-y-fluid-2">
      <Label htmlFor={id} className="text-fluid-sm">
        {label}
      </Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={SELECT_CLASS}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const WidgetItem = memo(
  ({ widget, scale, selected, onSelect, onUpdate }: WidgetItemProps) => (
    <Rnd
      bounds="parent"
      scale={scale}
      position={{ x: widget.x, y: widget.y }}
      size={{ width: widget.w, height: widget.h }}
      minWidth={MIN_WIDGET_W}
      minHeight={MIN_WIDGET_H}
      onDragStart={() => onSelect(widget.id)}
      onResizeStart={() => onSelect(widget.id)}
      onDragStop={(_, data) => onUpdate(widget.id, { x: data.x, y: data.y })}
      onResizeStop={(_, __, ref, ___, position) =>
        onUpdate(widget.id, {
          x: position.x,
          y: position.y,
          w: ref.offsetWidth,
          h: ref.offsetHeight,
        })
      }
      className={selected ? "z-10" : ""}
      style={{ touchAction: "none" }}
    >
      <div
        className={cn(
          `
          h-full w-full rounded-xl p-4 text-3xl
          flex items-center justify-center
          border-3 border-dashed
          `,
          selected
            ? "border-pink-500 bg-pink-500/10"
            : "border-pink-300/50 bg-background/80",
        )}
      >
        <span className="pointer-events-none capitalize">
          {widget.component} widget
        </span>
      </div>
    </Rnd>
  ),
);

WidgetItem.displayName = "WidgetItem";

/* EDITOR */

const Editor = ({ overlayId }: { overlayId: string }) => {
  const settingsId = useId();
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [overlay, setOverlay] = useState<Overlay>({
    ratio: "16/9",
    background: "transparent",
  });

  const size = RESOLUTIONS[overlay.ratio];
  const { stageRef, scale } = useFitScale(size.width, size.height);

  const selectedWidget =
    widgets.find((widget) => widget.id === selectedId) ?? null;

  const addWidget = useCallback(
    (component: WidgetType, x = 100, y = 100) => {
      const widget = clampWidget(
        { id: crypto.randomUUID(), component, x, y, ...DEFAULT_WIDGET_SIZE },
        size,
      );

      setWidgets((current) => [...current, widget]);
      setSelectedId(widget.id);
      setIsDirty(true);
    },
    [size],
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

  const widgetFields = selectedWidget
    ? ([
        { key: "x", label: "X", min: 0, max: size.width - selectedWidget.w },
        { key: "y", label: "Y", min: 0, max: size.height - selectedWidget.h },
        {
          key: "w",
          label: "Width",
          min: MIN_WIDGET_W,
          max: size.width - selectedWidget.x,
        },
        {
          key: "h",
          label: "Height",
          min: MIN_WIDGET_H,
          max: size.height - selectedWidget.y,
        },
      ] as const)
    : [];

  return (
    // dvh keeps the editor inside the visible viewport on mobile browsers
    <div
      className={`
        min-h-[calc(100dvh-4rem)] rounded-xl overflow-hidden
        flex flex-col border bg-background
        `}
    >
      {/* Toolbar */}
      <header
        className={`
          flex items-center justify-between border-b px-fluid-5 py-fluid-4
          `}
      >
        {/* EditorTitle */}
        <div
          className={`
            p-fluid-1 flex items-center gap-fluid-4 font-semibold
            `}
        >
          <Layers
            className="size-fluid-icon-lg text-pink-500"
            aria-hidden="true"
          />
          <span className="hidden sm:inline text-fluid-base">
            Overlay editor
          </span>
        </div>

        {/* OverlayId */}
        <span
          className={`
            hidden lg:block text-fluid-xs text-muted-foreground 
            `}
        >
          &lt; overlay &gt; <code>{overlayId}</code>
        </span>

        {/* Settings */}
        <div className="flex items-center gap-fluid-3">
          {/* SaveButton */}
          <Button
            type="button"
            onClick={handleSave}
            disabled={!isDirty || isSaving}
            className="bg-pink-500 text-white hover:bg-pink-600"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </header>

      {/* Editor panels */}
      <div
        className={`
          grid grid-cols-1 flex-1
          md:grid-cols-[2fr_5fr] lg:grid-cols-[1fr_3fr_1fr]
          `}
      >
        {/* Widget library */}
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
            {WIDGETS.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                type="button"
                draggable
                onDragStart={(event) =>
                  event.dataTransfer.setData("application/widget", type)
                }
                onClick={() => addWidget(type)}
                className={`
                  p-fluid-4 text-fluid-sm md:w-full
                  flex items-center gap-fluid-4
                  rounded-lg border
                  
                  hover:border-pink-400 hover:bg-pink-50/50
                  dark:hover:bg-pink-950/20
                  `}
              >
                <Icon
                  className="size-fluid-icon-lg text-pink-500"
                  aria-hidden="true"
                />
                {label}
              </button>
            ))}
          </div>
        </aside>

        {/* Canvas */}
        <main
          className={`
            bg-muted/40 p-fluid-5 h-full
            flex flex-col gap-fluid-4
            `}
        >
          {/* canvas resolution and preview scale */}
          <div
            className={`
              flex items-center gap-fluid-3
              text-fluid-xs text-muted-foreground
              `}
          >
            <Monitor className="size-fluid-icon-md" aria-hidden="true" />

            <span>
              {size.width} × {size.height}
            </span>

            {scale !== null && (
              <span className="text-pink-500">{Math.round(scale * 100)}%</span>
            )}

            <span className="hidden sm:inline">
              · use the same size for the OBS browser source
            </span>
          </div>

          {/* canvas stage */}
          <div
            ref={stageRef}
            className={`
              overflow-hidden p-1
              flex flex-1 items-center justify-center
              `}
          >
            {scale !== null && (
              // outer box has the on-screen (scaled) size
              <div
                className={`
                  relative shadow-xl
                  outline-2 outline-dashed outline-pink-400/60
                  `}
                style={{
                  width: size.width * scale,
                  height: size.height * scale,
                }}
              >
                {/* inner canvas keeps the logical size and is scaled down */}
                <div
                  aria-label="Overlay canvas"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={handleDrop}
                  onClick={(event) => {
                    if (event.target === event.currentTarget)
                      setSelectedId(null);
                  }}
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{
                    width: size.width,
                    height: size.height,
                    background: overlay.background,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  {widgets.map((widget) => (
                    <WidgetItem
                      key={widget.id}
                      widget={widget}
                      scale={scale}
                      selected={selectedId === widget.id}
                      onSelect={setSelectedId}
                      onUpdate={updateWidget}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Settings */}
        <aside
          id={settingsId}
          className={`
            md:col-span-2 lg:col-span-1
            overflow-auto border-t p-fluid-5
            md:border-t-0 md:border-l
            `}
        >
          <h2
            className={`
              hidden md:block
              mb-fluid-4 text-fluid-sm font-semibold
              `}
          >
            Settings
          </h2>

          <div className="space-y-fluid-5">
            <section className="space-y-fluid-4">
              <h3
                className={`
                  text-fluid-xs font-medium text-muted-foreground
                  `}
              >
                OVERLAY SETTINGS
              </h3>

              <div className="grid grid-cols-2 gap-fluid-4 lg:grid-cols-1">
                <SelectField
                  label="Aspect ratio"
                  value={overlay.ratio}
                  options={RATIO_OPTIONS}
                  onChange={(value) => {
                    if (isRatio(value)) updateOverlay({ ratio: value });
                  }}
                />

                <SelectField
                  label="Background"
                  value={overlay.background}
                  options={BACKGROUNDS}
                  onChange={(background) => updateOverlay({ background })}
                />
              </div>
            </section>

            {selectedWidget && (
              <section className="space-y-fluid-4 border-t pt-fluid-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-fluid-xs font-medium text-muted-foreground">
                    WIDGET SETTINGS
                  </h3>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => deleteWidget(selectedWidget.id)}
                    aria-label="Delete widget"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 aria-hidden="true" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-fluid-4 md:grid-cols-1">
                  {widgetFields.map(({ key, label, min, max }) => (
                    <NumberField
                      key={key}
                      label={label}
                      value={selectedWidget[key]}
                      min={min}
                      max={max}
                      onChange={(value) =>
                        updateWidget(selectedWidget.id, { [key]: value })
                      }
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export { Editor };
