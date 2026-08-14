"use client";

import React, { createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconSearch,
  IconWorld,
  IconCommand,
  IconCaretLeftFilled,
  IconCaretDownFilled,
} from "@tabler/icons-react";

interface KeyboardContextType {
  activeKeys: Set<string>;
}

const KeyboardContext = createContext<KeyboardContextType>({
  activeKeys: new Set(),
});

export const useKeyboardContext = () => useContext(KeyboardContext);

export interface KeyboardProps {
  className?: string;
  activeKeys?: Set<string>;
}

export function Keyboard({ className, activeKeys = new Set() }: KeyboardProps) {
  return (
    <KeyboardContext.Provider value={{ activeKeys }}>
      <div
        className={cn(
          "mx-auto w-fit [zoom:0.85] sm:[zoom:1.1] md:[zoom:1.35] lg:[zoom:1.6]",
          className
        )}
      >
        <Keypad />
      </div>
    </KeyboardContext.Provider>
  );
}

export function Keypad() {
  return (
    <div className="h-full w-fit rounded-2xl bg-neutral-200 dark:bg-neutral-900 p-2 shadow-xl border border-neutral-300 dark:border-neutral-800 select-none">
      {/* Function Row */}
      <Row>
        <Key
          keyCode="Escape"
          containerClassName="rounded-tl-xl"
          className="w-10 rounded-tl-lg"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>esc</span>
        </Key>
        <Key keyCode="F1">
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="mt-1">F1</span>
        </Key>
        <Key keyCode="F2">
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="mt-1">F2</span>
        </Key>
        <Key keyCode="F3">
          <IconTable className="h-[6px] w-[6px]" />
          <span className="mt-1">F3</span>
        </Key>
        <Key keyCode="F4">
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="mt-1">F4</span>
        </Key>
        <Key keyCode="F5">
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="mt-1">F5</span>
        </Key>
        <Key keyCode="F6">
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="mt-1">F6</span>
        </Key>
        <Key keyCode="F7">
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="mt-1">F7</span>
        </Key>
        <Key keyCode="F8">
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="mt-1">F8</span>
        </Key>
        <Key keyCode="F9">
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="mt-1">F9</span>
        </Key>
        <Key keyCode="F10">
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="mt-1">F10</span>
        </Key>
        <Key keyCode="F11">
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="mt-1">F11</span>
        </Key>
        <Key keyCode="F12">
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="mt-1">F12</span>
        </Key>
        <Key containerClassName="rounded-tr-xl" className="rounded-tr-lg">
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-300 via-neutral-200 to-neutral-300 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-700 p-px">
            <div className="h-full w-full rounded-full bg-neutral-100 dark:bg-neutral-900" />
          </div>
        </Key>
      </Row>

      {/* Number Row */}
      <Row>
        <Key keyCode="Backquote">
          <span>~</span>
          <span>`</span>
        </Key>
        <Key keyCode="Digit1">
          <span>!</span>
          <span>1</span>
        </Key>
        <Key keyCode="Digit2">
          <span>@</span>
          <span>2</span>
        </Key>
        <Key keyCode="Digit3">
          <span>#</span>
          <span>3</span>
        </Key>
        <Key keyCode="Digit4">
          <span>$</span>
          <span>4</span>
        </Key>
        <Key keyCode="Digit5">
          <span>%</span>
          <span>5</span>
        </Key>
        <Key keyCode="Digit6">
          <span>^</span>
          <span>6</span>
        </Key>
        <Key keyCode="Digit7">
          <span>&</span>
          <span>7</span>
        </Key>
        <Key keyCode="Digit8">
          <span>*</span>
          <span>8</span>
        </Key>
        <Key keyCode="Digit9">
          <span>(</span>
          <span>9</span>
        </Key>
        <Key keyCode="Digit0">
          <span>)</span>
          <span>0</span>
        </Key>
        <Key keyCode="Minus">
          <span>—</span>
          <span>_</span>
        </Key>
        <Key keyCode="Equal">
          <span>+</span>
          <span>=</span>
        </Key>
        <Key
          keyCode="Backspace"
          className="w-10"
          childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
        >
          <span>delete</span>
        </Key>
      </Row>

      {/* QWERTY Row */}
      <Row>
        <Key
          keyCode="Tab"
          className="w-10"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>tab</span>
        </Key>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => (
          <Key key={letter} keyCode={`Key${letter}`}>
            {letter}
          </Key>
        ))}
        <Key keyCode="BracketLeft">
          <span>{`{`}</span>
          <span>{`[`}</span>
        </Key>
        <Key keyCode="BracketRight">
          <span>{`}`}</span>
          <span>{`]`}</span>
        </Key>
        <Key keyCode="Backslash">
          <span>{`|`}</span>
          <span>{`\\`}</span>
        </Key>
      </Row>

      {/* Home Row */}
      <Row>
        <Key
          keyCode="CapsLock"
          className="w-[2.8rem]"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>caps lock</span>
        </Key>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => (
          <Key key={letter} keyCode={`Key${letter}`}>
            {letter}
          </Key>
        ))}
        <Key keyCode="Semicolon">
          <span>:</span>
          <span>;</span>
        </Key>
        <Key keyCode="Quote">
          <span>{`"`}</span>
          <span>{`'`}</span>
        </Key>
        <Key
          keyCode="Enter"
          className="w-[2.85rem]"
          childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
        >
          <span>return</span>
        </Key>
      </Row>

      {/* Bottom Letter Row */}
      <Row>
        <Key
          keyCode="ShiftLeft"
          className="w-[3.65rem]"
          childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>shift</span>
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((letter) => (
          <Key key={letter} keyCode={`Key${letter}`}>
            {letter}
          </Key>
        ))}
        <Key keyCode="Comma">
          <span>{`<`}</span>
          <span>,</span>
        </Key>
        <Key keyCode="Period">
          <span>{`>`}</span>
          <span>.</span>
        </Key>
        <Key keyCode="Slash">
          <span>?</span>
          <span>/</span>
        </Key>
        <Key
          keyCode="ShiftRight"
          className="w-[3.65rem]"
          childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
        >
          <span>shift</span>
        </Key>
      </Row>

      {/* Modifier Row */}
      <Row>
        <ModifierKey
          keyCode="Fn"
          containerClassName="rounded-bl-xl"
          className="rounded-bl-lg"
        >
          <span>fn</span>
          <IconWorld className="h-[6px] w-[6px]" />
        </ModifierKey>
        <ModifierKey keyCode="ControlLeft">
          <IconChevronUp className="h-[6px] w-[6px]" />
          <span>control</span>
        </ModifierKey>
        <ModifierKey keyCode="AltLeft">
          <OptionKey className="h-[6px] w-[6px]" />
          <span>option</span>
        </ModifierKey>
        <ModifierKey keyCode="MetaLeft" className="w-8">
          <IconCommand className="h-[6px] w-[6px]" />
          <span>command</span>
        </ModifierKey>
        <Key keyCode="Space" className="w-[8.2rem]" />
        <ModifierKey keyCode="MetaRight" className="w-8">
          <IconCommand className="h-[6px] w-[6px]" />
          <span>command</span>
        </ModifierKey>
        <ModifierKey keyCode="AltRight">
          <OptionKey className="h-[6px] w-[6px]" />
          <span>option</span>
        </ModifierKey>
        {/* Arrow Keys */}
        <div className="flex h-6 w-[4.9rem] items-center justify-end rounded-[4px] p-[0.5px]">
          <Key keyCode="ArrowLeft" className="h-6 w-6">
            <IconCaretLeftFilled className="h-[6px] w-[6px]" />
          </Key>
          <div className="flex flex-col">
            <Key keyCode="ArrowUp" className="h-3 w-6">
              <IconCaretUpFilled className="h-[6px] w-[6px]" />
            </Key>
            <Key keyCode="ArrowDown" className="h-3 w-6">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </Key>
          </div>
          <Key
            keyCode="ArrowRight"
            containerClassName="rounded-br-xl"
            className="h-6 w-6 rounded-br-lg"
          >
            <IconCaretRightFilled className="h-[6px] w-[6px]" />
          </Key>
        </div>
      </Row>
    </div>
  );
}

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">{children}</div>
);

const Key = ({
  className,
  childrenClassName,
  containerClassName,
  children,
  keyCode,
}: {
  className?: string;
  childrenClassName?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  keyCode?: string;
}) => {
  const { activeKeys } = useKeyboardContext();
  const isPressed = keyCode ? activeKeys.has(keyCode) : false;

  return (
    <div className={cn("rounded-[4px] p-[0.5px]", containerClassName)}>
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all duration-75 shadow-xs border border-neutral-200/50 dark:border-neutral-700/50",
          isPressed &&
            "scale-[0.95] bg-foreground text-background font-bold shadow-inner ring-2 ring-foreground/40",
          className
        )}
      >
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center text-[5px] font-medium leading-none",
            childrenClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const ModifierKey = ({
  className,
  containerClassName,
  children,
  keyCode,
}: {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  keyCode?: string;
}) => {
  const { activeKeys } = useKeyboardContext();
  const isPressed = keyCode ? activeKeys.has(keyCode) : false;

  return (
    <div className={cn("rounded-[4px] p-[0.5px]", containerClassName)}>
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all duration-75 shadow-xs border border-neutral-200/50 dark:border-neutral-700/50",
          isPressed &&
            "scale-[0.95] bg-foreground text-background font-bold shadow-inner ring-2 ring-foreground/40",
          className
        )}
      >
        <div className="flex h-full w-full flex-col items-start justify-between p-1 text-[5px] font-medium">
          {children}
        </div>
      </div>
    </div>
  );
};

const OptionKey = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25"
      />
    </svg>
  );
};
