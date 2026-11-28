"use client";

import { Rnd } from "react-rnd";
import { cn } from "@/lib/utils";
import type { Widget } from "@/types";
import { Monitor } from "lucide-react";
import { WIDGETS } from "./editor-constants";
import { memo, useEffect, useRef, useState } from "react";
import type { Size, WidgetItemProps } from "./editor-types";
import { MIN_WIDGET_W, MIN_WIDGET_H } from "./editor-constants";

// calculate a scale that fits the canvas inside the available stage
const useFitScale = (width: number, height: number) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width: stageWidth, height: stageHeight } = entry.contentRect;
      if (stageWidth === 0 || stageHeight === 0) return;

      setScale(Math.min(stageWidth / width, stageHeight / height, 1));
    });

    observer.observe(stage);
    return () => observer.disconnect();
  }, [width, height]);

  return { stageRef, scale };
};

const WidgetItem = memo(
  ({ widget, scale, selected, onSelect, onUpdate }: WidgetItemProps) => {
    const Comp = WIDGETS[widget.widget_type].component;
    return (
      <Rnd
        scale={scale}
        bounds="parent"
        minWidth={MIN_WIDGET_W}
        minHeight={MIN_WIDGET_H}

        position={{ x: widget.x, y: widget.y }}
        size={{ width: widget.w, height: widget.h }}

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

        style={{ touchAction: "none" }}
        className={selected ? "z-10" : ""}
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
            <Comp />
          </span>
        </div>
      </Rnd>
    );
  },
);

WidgetItem.displayName = "WidgetItem";

type DropZoneProps = {
  size: Size;
  scale: number;
  widgets: Widget[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, values: Partial<Widget>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
};

const DropZone = (props: DropZoneProps) => {
  const { onSelect, onUpdate, onDrop } = props;
  const { size, scale, widgets, selectedId } = props;

  return (
    <div
      aria-label="overlay canvas"
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) onSelect(null);
      }}
      className="absolute top-0 left-0"
      style={{
        background: "transparent",
        width: size.width,
        height: size.height,
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
          onSelect={onSelect}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

type CanvasStageProps = {
  size: Size;
  stageRef: React.Ref<HTMLDivElement>;
  scale: number | null;
  widgets: Widget[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, values: Partial<Widget>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
};

const CanvasStage = (props: CanvasStageProps) => {
  const { onSelect, onUpdate, onDrop } = props;
  const { size, stageRef, scale, widgets, selectedId } = props;

  return (
    /* canvas stage */
    <div
      ref={stageRef}
      className={`
        flex flex-1 items-center justify-center
        `}
    >
      {scale !== null && (
        // Outer wrapper (scaled size, reserves preview space)
        <div
          className={`
            relative shadow-md
            outline-2 outline-dashed outline-pink-400/60
            `}
          style={{
            width: size.width * scale,
            height: size.height * scale,
          }}
        >
          {/* Inner canvas (original size, visually scaled down) */}
          <DropZone
            size={size}
            scale={scale}
            widgets={widgets}
            selectedId={selectedId}
            onSelect={onSelect}
            onUpdate={onUpdate}
            onDrop={onDrop}
          />
        </div>
      )}
    </div>
  );
};

type CanvasToolbarProps = {
  size: Size;
  scale: number | null;
};

const CanvasToolbar = ({ size, scale }: CanvasToolbarProps) => (
  /* canvas resolution and preview scale */
  <div
    className={`
      flex items-center gap-fluid-3 px-fluid-2
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
);

type EditorCanvasProps = {
  size: Size;
  widgets: Widget[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, values: Partial<Widget>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  stageRef: React.Ref<HTMLDivElement>;
  scale: number | null;
};

const EditorCanvas = (props: EditorCanvasProps) => {
  const { onSelect, onUpdate, onDrop } = props;
  const { size, widgets, selectedId, stageRef, scale } = props;

  return (
    /* EditorCanvas */
    <main
      className={`
        flex flex-col gap-fluid-4 bg-muted/40 p-fluid-5
        `}
    >
      <CanvasToolbar size={size} scale={scale} />
      <CanvasStage
        size={size}
        stageRef={stageRef}
        scale={scale}
        widgets={widgets}
        selectedId={selectedId}
        onSelect={onSelect}
        onUpdate={onUpdate}
        onDrop={onDrop}
      />
    </main>
  );
};

export { useFitScale, EditorCanvas };
