import type { Ratio } from "./editor-types";
import dynamic from "next/dynamic";
const CmntVote = dynamic(() =>
  import("../widgets/CmntVote").then((mod) => mod.CmntVote),
);

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

// use real widgets
const WIDGETS = [{ label: "Comment Vote", component: CmntVote }];

/* const BACKGROUNDS = [
  { value: "transparent", label: "Transparent" },
  { value: "#000000", label: "Black" },
  { value: "#ffffff", label: "White" },
];
 */

const MIN_WIDGET_W = 100;
const MIN_WIDGET_H = 50;
const DEFAULT_WIDGET_SIZE = { w: 400, h: 120 };
const SELECT_CLASS = `
w-full rounded-md px-fluid-4 py-fluid-3
border bg-background text-fluid-sm
`;

export { RESOLUTIONS, WIDGETS, RATIO_OPTIONS };
export { MIN_WIDGET_H, MIN_WIDGET_W, DEFAULT_WIDGET_SIZE, SELECT_CLASS };
