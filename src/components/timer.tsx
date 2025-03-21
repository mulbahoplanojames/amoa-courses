"use client";

import { useState, useEffect, useRef } from "react";

interface TimerProps {
  initialTime: number;
  onTimeUpdate?: (timeRemaining: number) => void;
  onTimeEnd?: () => void;
}

export function Timer({ initialTime, onTimeUpdate, onTimeEnd }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeUpdateRef = useRef(onTimeUpdate);
  const onTimeEndRef = useRef(onTimeEnd);

  // Update refs when props change
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
    onTimeEndRef.current = onTimeEnd;
  }, [onTimeUpdate, onTimeEnd]);

  useEffect(() => {
    // Initialize time from props
    setTimeRemaining(initialTime);
  }, [initialTime]);

  useEffect(() => {
    // Set up the timer
    timerRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;

        // Call onTimeUpdate outside of setState
        if (newTime >= 0 && onTimeUpdateRef.current) {
          onTimeUpdateRef.current(newTime);
        }

        if (newTime <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }

          if (onTimeEndRef.current) {
            onTimeEndRef.current();
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);

    // Clean up the timer
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []); // Empty dependency array so it only runs once on mount

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return <span>{formatTime(timeRemaining)}</span>;
}
