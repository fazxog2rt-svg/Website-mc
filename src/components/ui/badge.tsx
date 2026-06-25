import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
        secondary: "bg-white/10 text-white/80 border border-white/20",
        destructive: "bg-red-500/20 text-red-300 border border-red-500/30",
        outline: "border border-white/20 text-white/80",
        success: "bg-green-500/20 text-green-300 border border-green-500/30",
        warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
        purple: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
        gold: "bg-yellow-400/20 text-yellow-300 border border-yellow-400/30",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
