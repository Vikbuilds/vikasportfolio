"use client";

import React from "react";
import { Keyboard } from "@/components/ui/keyboard";

export interface KeyboardDemoProps {
  activeKeys?: Set<string>;
}

export function KeyboardDemo({ activeKeys = new Set() }: KeyboardDemoProps) {
  return (
    <div className="flex w-full items-center justify-center py-6">
      <Keyboard activeKeys={activeKeys} />
    </div>
  );
}

export default KeyboardDemo;
