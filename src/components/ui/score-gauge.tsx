"use client";

import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  title?: string;
}

export function ScoreGauge({
  score,
  maxScore = 100,
  size = 180,
  strokeWidth = 14,
  title = "Research Quality",
}: ScoreGaugeProps) {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setCurrentScore(score);
        clearInterval(timer);
      } else {
        setCurrentScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progress = (currentScore / maxScore) * circumference;
  const strokeDashoffset = circumference - progress;

  const getColor = (s: number) => {
    if (s >= 85) return "#10b981"; // Emerald
    if (s >= 70) return "#3b82f6"; // Blue
    if (s >= 50) return "#f59e0b"; // Amber
    return "#ef4444"; // Red
  };

  const currentColor = getColor(currentScore);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-40"
        />
        {/* Animated Progress track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={currentColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-300 ease-out drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]"
        />
      </svg>

      {/* Inner Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-extrabold tracking-tight" style={{ color: currentColor }}>
          {currentScore}
        </span>
        <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">
          Out of {maxScore}
        </span>
      </div>
    </div>
  );
}
