"use client";

import type { Widget } from "@/types";
import type { Overlay, Size } from "./editor-types";
import {
  BACKGROUNDS,
  MIN_WIDGET_H,
  MIN_WIDGET_W,
  RATIO_OPTIONS,
} from "./editor-constants";
import { isRatio } from "./editor-helpers";
import { NumberField, SelectField } from "./EditorFields";
import { Button } from "@/components/ui/shadcn/button";
import { Trash2 } from "lucide-react";

type EditorSettingsProps = {
  settingsId: string;
  overlay: Overlay;
  selectedWidget: Widget | null;
  size: Size;
  onUpdateOverlay: (values: Partial<Overlay>) => void;
  onUpdateWidget: (id: string, values: Partial<Widget>) => void;
  onDeleteWidget: (id: string) => void;
};

const OverlaySettings = ({
  overlay,
  onUpdateOverlay,
}: {
  overlay: Overlay;
  onUpdateOverlay: (values: Partial<Overlay>) => void;
}) => (
  <section className="space-y-fluid-4">
    <h3
      className={`
        text-fluid-xs font-medium text-muted-foreground
      `}
    >
      OVERLAY SETTINGS
    </h3>

    <div className="grid grid-cols-2 gap-fluid-4 lg:grid-cols-1">
      <SelectField
        label="Aspect ratio"
        value={overlay.ratio}
        options={RATIO_OPTIONS}
        onChange={(value) => {
          if (isRatio(value)) onUpdateOverlay({ ratio: value });
        }}
      />

      <SelectField
        label="Background"
        value={overlay.background}
        options={BACKGROUNDS}
        onChange={(background) => onUpdateOverlay({ background })}
      />
    </div>
  </section>
);

const DeleteWidgetButton = ({ onDelete }: { onDelete: () => void }) => (
  <Button
    type="button"
    variant="ghost"
    size="icon-sm"
    onClick={onDelete}
    aria-label="Delete widget"
    className="text-red-500 hover:text-red-600"
  >
    <Trash2 aria-hidden="true" />
  </Button>
);

const WidgetPositionFields = ({
  widget,
  size,
  onUpdateWidget,
}: {
  widget: Widget;
  size: Size;
  onUpdateWidget: (id: string, values: Partial<Widget>) => void;
}) => (
  <>
    <NumberField
      label="X"
      value={widget.x}
      min={0}
      max={size.width - widget.w}
      onChange={(value) => onUpdateWidget(widget.id, { x: value })}
    />
    <NumberField
      label="Y"
      value={widget.y}
      min={0}
      max={size.height - widget.h}
      onChange={(value) => onUpdateWidget(widget.id, { y: value })}
    />
  </>
);

const WidgetSizeFields = ({
  widget,
  size,
  onUpdateWidget,
}: {
  widget: Widget;
  size: Size;
  onUpdateWidget: (id: string, values: Partial<Widget>) => void;
}) => (
  <>
    <NumberField
      label="Width"
      value={widget.w}
      min={MIN_WIDGET_W}
      max={size.width - widget.x}
      onChange={(value) => onUpdateWidget(widget.id, { w: value })}
    />
    <NumberField
      label="Height"
      value={widget.h}
      min={MIN_WIDGET_H}
      max={size.height - widget.y}
      onChange={(value) => onUpdateWidget(widget.id, { h: value })}
    />
  </>
);

const WidgetSettings = ({
  widget,
  size,
  onUpdateWidget,
  onDeleteWidget,
}: {
  widget: Widget;
  size: Size;
  onUpdateWidget: (id: string, values: Partial<Widget>) => void;
  onDeleteWidget: (id: string) => void;
}) => (
  <section className="space-y-fluid-4 border-t pt-fluid-5">
    <div className="flex items-center justify-between">
      <h3 className="text-fluid-xs font-medium text-muted-foreground">
        WIDGET SETTINGS
      </h3>

      <DeleteWidgetButton onDelete={() => onDeleteWidget(widget.id)} />
    </div>

    <div className="grid grid-cols-2 gap-fluid-4 md:grid-cols-1">
      <WidgetPositionFields
        widget={widget}
        size={size}
        onUpdateWidget={onUpdateWidget}
      />
      <WidgetSizeFields
        widget={widget}
        size={size}
        onUpdateWidget={onUpdateWidget}
      />
    </div>
  </section>
);

export const EditorSettings = ({
  settingsId,
  overlay,
  selectedWidget,
  size,
  onUpdateOverlay,
  onUpdateWidget,
  onDeleteWidget,
}: EditorSettingsProps) => (
  /* Settings */
  <aside
    id={settingsId}
    className={`
      md:col-span-2 lg:col-span-1
      overflow-auto border-t p-fluid-5
      md:border-t-0 md:border-l
    `}
  >
    <h2
      className={`
        hidden md:block
        mb-fluid-4 text-fluid-sm font-semibold
      `}
    >
      Settings
    </h2>

    <div className="space-y-fluid-5">
      <OverlaySettings overlay={overlay} onUpdateOverlay={onUpdateOverlay} />

      {selectedWidget && (
        <WidgetSettings
          widget={selectedWidget}
          size={size}
          onUpdateWidget={onUpdateWidget}
          onDeleteWidget={onDeleteWidget}
        />
      )}
    </div>
  </aside>
);
