import type { Widget } from "@/types";
import type { RESOLUTIONS } from "./editor-constants";

export type WidgetType = "text" | "clock" | "username" | "goal";
export type Ratio = keyof typeof RESOLUTIONS;
export type Overlay = { ratio: Ratio; background: string };
export type Size = { width: number; height: number };

export type NumberFieldProps = {
  label: string;
  value: number;
  min: number;
  max?: number;
  onChange: (value: number) => void;
};

export type SelectFieldProps = {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
};

export type WidgetItemProps = {
  widget: Widget;
  scale: number;
  selected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, values: Partial<Widget>) => void;
};
