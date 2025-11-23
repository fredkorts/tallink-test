import React from "react";

/**
 * HistoryItem - Single entry in the calculator history
 * @param {object} props
 * @param {string|object} props.entry - The history entry (string or formatted object)
 * @param {Function} [props.onSelect] - Optional click handler
 */
export default function HistoryItem({ entry, onSelect }) {
  return (
    <div
      className="history-item"
      tabIndex={0}
      role="button"
      aria-label={`History entry: ${typeof entry === "string" ? entry : entry.display}`}
      onClick={onSelect ? () => onSelect(entry) : undefined}
      onKeyPress={
        onSelect
          ? (e) => {
              if (e.key === "Enter") onSelect(entry);
            }
          : undefined
      }
    >
      {typeof entry === "string" ? entry : entry.display}
    </div>
  );
}
