import dynamic from "next/dynamic";
const CmntVote = dynamic(() =>
  import("../widgets/CmntVote").then((mod) => mod.CmntVote),
);
import { CmntVoteMeta } from "../widgets/CmntVote";

type WidgetRegistryItem = {
  label: string;
  component: React.ComponentType<any>;
  defaultSize: { w: number; h: number };
};

const WIDGETS = {
  "comment-vote": {
    label: "Comment Vote",
    component: CmntVote,
    ...CmntVoteMeta,
  },
} satisfies Record<string, WidgetRegistryItem>;

type WidgetType = keyof typeof WIDGETS;

const RESOLUTIONS = {
  "16/9": { width: 1920, height: 1080, label: "Landscape (16:9)" },
  "9/16": { width: 1080, height: 1920, label: "Portrait (9:16)" },
  "1/1": { width: 1080, height: 1080, label: "Square (1:1)" },
};
type Ratio = keyof typeof RESOLUTIONS;

const BACKGROUNDS = [{ value: "transparent", label: "Transparent" }];

const MIN_WIDGET_W = 200;
const MIN_WIDGET_H = 80;
const DEFAULT_WIDGET_SIZE = { w: 400, h: 120 };
const SELECT_CLASS = `
w-full rounded-md px-fluid-4 py-fluid-3
border bg-background text-fluid-sm
`;

const RATIO_OPTIONS = (Object.keys(RESOLUTIONS) as Ratio[]).map((value) => {
  return {
    value,
    label: RESOLUTIONS[value].label,
  };
});

export type { WidgetRegistryItem, Ratio, WidgetType };
export { WIDGETS, BACKGROUNDS, RESOLUTIONS, RATIO_OPTIONS };
export { MIN_WIDGET_H, MIN_WIDGET_W, DEFAULT_WIDGET_SIZE, SELECT_CLASS };
