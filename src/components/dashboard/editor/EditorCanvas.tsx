"use client";

import { memo, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Widget } from "@/types";
import type { Size, WidgetItemProps } from "./editor-types";
import { MIN_WIDGET_W, MIN_WIDGET_H } from "./editor-constants";

export const useFitScale = (width: number, height: number) => {
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

type DropZoneProps = {
  size: Size;
  background: string;
  scale: number;
  widgets: Widget[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, values: Partial<Widget>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
};

const DropZone = ({
  size,
  background,
  scale,
  widgets,
  selectedId,
  onSelect,
  onUpdate,
  onDrop,
}: DropZoneProps) => (
  <div
    aria-label="overlay canvas"
    onDragOver={(event) => event.preventDefault()}
    onDrop={onDrop}
    onClick={(event) => {
      if (event.target === event.currentTarget) onSelect(null);
    }}
    className="absolute top-0 left-0"
    style={{
      width: size.width,
      height: size.height,
      background,
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

type CanvasStageProps = {
  size: Size;
  background: string;
  stageRef: React.Ref<HTMLDivElement>;
  scale: number | null;
  widgets: Widget[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, values: Partial<Widget>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
};

const CanvasStage = ({
  size,
  background,
  stageRef,
  scale,
  widgets,
  selectedId,
  onSelect,
  onUpdate,
  onDrop,
}: CanvasStageProps) => (
  /* canvas stage */
  <div
    ref={stageRef}
    className={`
      bg-amber-100
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
          background={background}
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
  background: string;
  widgets: Widget[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, values: Partial<Widget>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  stageRef: React.Ref<HTMLDivElement>;
  scale: number | null;
};

export const EditorCanvas = ({
  size,
  background,
  widgets,
  selectedId,
  onSelect,
  onUpdate,
  onDrop,
  stageRef,
  scale,
}: EditorCanvasProps) => {
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
        background={background}
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
