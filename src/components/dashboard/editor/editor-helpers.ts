import type { Widget } from "@/types";
import type { Size, WidgetType, Ratio } from "./editor-types";
import {
  WIDGETS,
  RESOLUTIONS,
  MIN_WIDGET_W,
  MIN_WIDGET_H,
} from "./editor-constants";

// check if value in RESOLUTIONS
export const isRatio = (value: string): value is Ratio => value in RESOLUTIONS;

export const isWidgetType = (value: string): value is WidgetType =>
  WIDGETS.some((widget) => widget.type === value);

// keep value in range min-max
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// keep widget x, y, w, h in canvas boundaries
export const clampWidget = (widget: Widget, size: Size): Widget => {
  const w = clamp(widget.w, MIN_WIDGET_W, size.width);
  const h = clamp(widget.h, MIN_WIDGET_H, size.height);
  const x = clamp(widget.x, 0, size.width - w);
  const y = clamp(widget.y, 0, size.height - h);

  return { ...widget, w, h, x, y };
};
