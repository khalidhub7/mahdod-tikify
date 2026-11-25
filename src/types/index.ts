type Widget = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: string;
};

type Overlay = {
  id: string;
  name: string;
  tiktok_username: string;
  is_active: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type { Widget, Overlay };
