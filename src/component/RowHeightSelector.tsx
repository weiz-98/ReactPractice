import React from "react";

const rowHeightOptions = {
  low: 25,
  middle: 50,
  high: 75,
};

interface RowHeightSelectorProps {
  currentRowHeight: number;
  onRowHeightChange: (newHeight: string) => void;
}

const RowHeightSelector: React.FC<RowHeightSelectorProps> = ({
  currentRowHeight,
  onRowHeightChange,
}) => {
  return (
    <select
      value={currentRowHeight}
      onChange={(e) => onRowHeightChange(e.target.value)}
    >
      {Object.entries(rowHeightOptions).map(([label, value]) => (
        <option key={label} value={value}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default RowHeightSelector;
