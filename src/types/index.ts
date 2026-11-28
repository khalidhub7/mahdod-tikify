import type { WidgetType } from "@/components/dashboard/editor/editor-constants";

type Widget = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  widget_type: WidgetType;
};

type Overlay = {
  id: string;
  user_id: string;
  name: string;
  ratio: string;
  tiktok_username: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type { Widget, Overlay };
