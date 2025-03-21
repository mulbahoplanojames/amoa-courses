import { Button } from "@/components/ui/button";
import React from "react";

interface QuizDurationProps {
  selectedDurations: string[];
  setSelectedDurations: (durations: string[]) => void;
  durations: { value: string; label: string }[];
  toggleDuration: (value: string) => void;
}

const QuizDuration: React.FC<QuizDurationProps> = ({
  selectedDurations,
  setSelectedDurations,
  durations,
  toggleDuration,
}) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Duration</h3>
          {selectedDurations.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => setSelectedDurations([])}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {durations.map((duration) => (
            <div key={duration.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`duration-${duration.value}`}
                className="rounded text-primary focus:ring-primary"
                checked={selectedDurations.includes(duration.value)}
                onChange={() => toggleDuration(duration.value)}
              />
              <label
                htmlFor={`duration-${duration.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {duration.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuizDuration;
