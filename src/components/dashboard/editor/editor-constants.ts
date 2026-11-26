import { Type, Clock, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Ratio, WidgetType } from "./editor-types";

export const RESOLUTIONS = {
  "16/9": { width: 1920, height: 1080, label: "Landscape (16:9)" },
  "9/16": { width: 1080, height: 1920, label: "Portrait (9:16)" },
  "1/1": { width: 1080, height: 1080, label: "Square (1:1)" },
} as const;

export const WIDGETS: readonly {
  type: WidgetType;
  label: string;
  icon: LucideIcon;
}[] = [
  { type: "text", label: "Text", icon: Type },
  { type: "clock", label: "Clock", icon: Clock },
  { type: "username", label: "Username", icon: Type },
  { type: "goal", label: "Goal", icon: Target },
];

export const BACKGROUNDS = [
  { value: "transparent", label: "Transparent" },
  { value: "#000000", label: "Black" },
  { value: "#ffffff", label: "White" },
] as const;

export const RATIO_OPTIONS = (Object.keys(RESOLUTIONS) as Ratio[]).map(
  (value) => {
    return {
      value,
      label: RESOLUTIONS[value].label,
    };
  },
);

export const MIN_WIDGET_W = 100;
export const MIN_WIDGET_H = 50;
export const DEFAULT_WIDGET_SIZE = { w: 400, h: 120 };
export const SELECT_CLASS = `
  w-full rounded-md px-fluid-4 py-fluid-3
  border bg-background text-fluid-sm
`;
