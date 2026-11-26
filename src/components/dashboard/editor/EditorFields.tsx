"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import type { NumberFieldProps, SelectFieldProps } from "./editor-types";
import { clamp } from "./editor-helpers";
import { SELECT_CLASS } from "./editor-constants";

export const NumberField = ({
  label,
  value,
  min,
  max,
  onChange,
}: NumberFieldProps) => {
  const id = useId();
  const [draft, setDraft] = useState(String(value));
  const [previousValue, setPreviousValue] = useState(value);

  if (value !== previousValue) {
    setPreviousValue(value);
    setDraft(String(value));
  }

  const commit = () => {
    const next = Number(draft);

    if (draft.trim() === "" || Number.isNaN(next)) {
      setDraft(String(value));
      return;
    }

    onChange(clamp(Math.round(next), min, max ?? Infinity));
  };

  return (
    <div className="space-y-fluid-2">
      <Label htmlFor={id} className="text-fluid-sm">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") commit();
        }}
      />
    </div>
  );
};

export const SelectField = ({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) => {
  const id = useId();

  return (
    <div className="space-y-fluid-2">
      <Label htmlFor={id} className="text-fluid-sm">
        {label}
      </Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={SELECT_CLASS}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
