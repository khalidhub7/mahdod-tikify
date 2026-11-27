import type { Widget } from "@/types";
import type { Size } from "./editor-types";
import { MIN_WIDGET_W, MIN_WIDGET_H } from "./editor-constants";

// keep value in range min-max
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// keep widget x, y, w, h in canvas boundaries
const clampWidget = (widget: Widget, size: Size): Widget => {
  const w = clamp(widget.w, MIN_WIDGET_W, size.width);
  const h = clamp(widget.h, MIN_WIDGET_H, size.height);
  const x = clamp(widget.x, 0, size.width - w);
  const y = clamp(widget.y, 0, size.height - h);

  return { ...widget, w, h, x, y };
};

export { clamp, clampWidget };
