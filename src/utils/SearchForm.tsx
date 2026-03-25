import { useCallback, useEffect, useState, type ChangeEvent } from "react";

import SearchIcon from "../assets/image/SearchIcon";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { searchPlants } from "../redux/searchSlice";
import type { SubPlant } from "../api/searchApi";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchForm = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search",
}: SearchFormProps) => {
  const dispatch = useAppDispatch();
  const { results, loading, error } = useAppSelector((state) => state.search);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useCallback(() => {
    const trimmedValue = value.trim();
    if (trimmedValue.length >= 2) {
      // Min 2 chars
      console.log("🔍 Live searching for:", trimmedValue);
      setIsOpen(true);
      dispatch(searchPlants(trimmedValue));
    } else {
      setIsOpen(false);
      // Clear results if too short
      // dispatch(clearSearch());  // Uncomment if you have clearSearch action
    }
  }, [value, dispatch]);

  useEffect(() => {
    const timer = setTimeout(debouncedSearch, 400); // 400ms debounce
    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    console.log("🔍 Searching for:", trimmedValue);

    dispatch(searchPlants(trimmedValue));

    onSubmit(trimmedValue);
  };

  results.map((result) => {
    console.log("Results", result.name);
  });

  const handleResultClick = (plantName: string) => {
    onChange(plantName);
    setIsOpen(false);
    onSubmit(plantName); // Optional: Trigger parent submit
  };

  return (
    <div className="relative">
      <form className="w-full" onSubmit={handleSubmit}>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-3 ps-10 bg-white-100 border border-gray-200 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-green-500 shadow-sm placeholder:text-gray-500 dark:bg-green-900 dark:border-green-600 dark:text-white dark:focus:border-emerald-500"
            placeholder={placeholder}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              {onChange(e.target.value)
              setIsOpen(true);
            }}
            required
          />

          {loading === "pending" && (
            <div className="absolute inset-y-0 end-0 pe-3 flex items-center">
              Searching...
            </div>
          )}
        </div>
      </form>

      {/* New: Results dropdown */}
      {isOpen && value.trim().length >= 2 && (
        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto dark:bg-green-900 dark:border-green-600">
          {loading === "pending" ? (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              Searching...
            </div>
          ) : error ? (
            <div className="px-4 py-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/50 dark:text-red-400">
              {error}
            </div>
          ) : results.length > 0 ? (
            <ul className="py-1">
              {results.map((result: SubPlant, index: number) => (
                <li
                  key={result._id || index} // Use _id or index
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-900 dark:text-white dark:hover:bg-green-800 transition-colors"
                  onClick={() => handleResultClick(result.name)}
                >
                  {result.name}{" "}
                  {/* Or add category/price: {result.name} ({result.category}) */}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              No plants found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
