import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "../lib/utils";
import Arrow from "../assets/Arrow";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(
  (
    { className, align = "center", side = "top", sideOffset = 4, ...props },
    ref
  ) => {
    return (
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "relative -left-2 -top-2 z-50 w-64 rounded-md border bg-[#333333] p-4 text-[#FFFFFF] shadow-md outline-none",
          className
        )}
        {...props}
      >
        {props.children}

        <div className="absolute left-1/2 mt-1 h-0 w-0 -translate-x-1/2 transform border-t-8 border-solid border-popover border-transparent">
          <Arrow />
        </div>
      </HoverCardPrimitive.Content>
    );
  }
);

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

const StandardHoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
StandardHoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  StandardHoverCardContent,
};
