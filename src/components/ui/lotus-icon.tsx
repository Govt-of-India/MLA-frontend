import React from "react"
import { cn } from "@/lib/utils"

interface LotusIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function LotusIcon({ className, ...props }: LotusIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      {...props}
    >
      {/* 8 Petals arranged in a circle - BJP Lotus Symbol */}
      {/* Top petal */}
      <ellipse
        cx="12"
        cy="4"
        rx="3"
        ry="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Top-right petal */}
      <ellipse
        cx="18"
        cy="6"
        rx="3"
        ry="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(45 12 12)"
      />
      {/* Right petal */}
      <ellipse
        cx="20"
        cy="12"
        rx="3"
        ry="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(90 12 12)"
      />
      {/* Bottom-right petal */}
      <ellipse
        cx="18"
        cy="18"
        rx="3"
        ry="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(135 12 12)"
      />
      {/* Bottom petal */}
      <ellipse
        cx="12"
        cy="20"
        rx="3"
        ry="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(180 12 12)"
      />
      {/* Bottom-left petal */}
      <ellipse
        cx="6"
        cy="18"
        rx="3"
        ry="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(225 12 12)"
      />
      {/* Left petal */}
      <ellipse
        cx="4"
        cy="12"
        rx="3"
        ry="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(270 12 12)"
      />
      {/* Top-left petal */}
      <ellipse
        cx="6"
        cy="6"
        rx="3"
        ry="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(315 12 12)"
      />
      {/* Center circle */}
      <circle
        cx="12"
        cy="12"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Stem */}
      <path
        d="M12 14V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

