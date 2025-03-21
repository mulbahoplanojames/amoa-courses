import { Button } from "@/components/ui/button";

interface DifficultyProps {
  selectedDifficulties: string[];
  setSelectedDifficulties: (difficulties: string[]) => void;
  difficulties: string[];
  toggleDifficulty: (difficulty: string) => void;
}

const QuizDifficulty: React.FC<DifficultyProps> = ({
  selectedDifficulties,
  setSelectedDifficulties,
  difficulties,
  toggleDifficulty,
}) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Difficulty</h3>
          {selectedDifficulties.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => setSelectedDifficulties([])}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {difficulties.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`difficulty-${level.toLowerCase()}`}
                className="rounded text-primary focus:ring-primary"
                checked={selectedDifficulties.includes(level)}
                onChange={() => toggleDifficulty(level)}
              />
              <label
                htmlFor={`difficulty-${level.toLowerCase()}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuizDifficulty;
