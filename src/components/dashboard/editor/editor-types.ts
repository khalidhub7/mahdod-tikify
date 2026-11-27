import type { Widget } from "@/types";
import type { RESOLUTIONS } from "./editor-constants";

type WidgetLabel = "Comment Vote";
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

export type { WidgetLabel, Ratio, Overlay, Size };
export type { NumberFieldProps, SelectFieldProps, WidgetItemProps };
