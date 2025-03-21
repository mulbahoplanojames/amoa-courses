import { Button } from "@/components/ui/button";
import React from "react";

interface Category {
  name: string;
  icon: React.ReactNode;
}

interface SelectedCategoriesProps {
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (categoryName: string) => void;
  setSelectedCategories: (categories: string[]) => void;
}

const SelectedCategories: React.FC<SelectedCategoriesProps> = ({
  categories,
  selectedCategories,
  toggleCategory,
  setSelectedCategories,
}) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Categories</h3>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => setSelectedCategories([])}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="md:space-y-2  grid md:grid-cols-1 grid-cols-2 md:gap-0 gap-3 space-y-0">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={
                selectedCategories.includes(category.name)
                  ? "default"
                  : "outline"
              }
              className="justify-start w-full font-normal"
              onClick={() => toggleCategory(category.name)}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectedCategories;
