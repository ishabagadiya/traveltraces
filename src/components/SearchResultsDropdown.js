import React from "react";

const SearchResultsDropdown = ({ 
  showResults, 
  destinations, 
  onDestinationClick, 
  className = "" 
}) => {
  if (!showResults) return null;

  return (
    <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto ${className}`}>
      {destinations.length > 0 ? (
        destinations.map((dest) => (
          <button
            key={dest._id}
            onClick={() => onDestinationClick(dest)}
            className="cursor-pointer w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
          >
            <div className="font-semibold text-secondary">{dest.name}</div>
            {dest.location && (
              <div className="text-sm text-gray-600">{dest.location}</div>
            )}
            {dest.tagline && (
              <div className="text-xs text-gray-500 truncate">{dest.tagline}</div>
            )}
          </button>
        ))
      ) : (
        <div className="px-4 py-6 text-center text-gray-500">
          <div className="text-2xl mb-2">🏔️</div>
          <div className="font-medium text-gray-700 mb-1">No destinations found</div>
          <div className="text-sm">Try searching with different keywords</div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsDropdown;
