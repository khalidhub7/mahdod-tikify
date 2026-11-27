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

const WIDGETS: Record<string, WidgetRegistryItem> = {
  "comment-vote": {
    label: "Comment Vote",
    component: CmntVote,
    ...CmntVoteMeta,
  },
};

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

export { WIDGETS };
export { MIN_WIDGET_H, MIN_WIDGET_W, DEFAULT_WIDGET_SIZE, SELECT_CLASS };
