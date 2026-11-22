type Widget = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: string;
};

type Overlay = { id: string; tiktok_username: string; widgets: Widget[] };

export type { Widget, Overlay };
