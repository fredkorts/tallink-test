import React from "react";
import HistoryItem from "./HistoryItem";
import "./HistoryPanel.css";

/**
 * HistoryPanel - Scrollable list of calculation history
 * @param {object} props
 * @param {Array} props.history - Array of history entry objects/strings
 * @param {Function} [props.onSelect] - Optional handler for clicking a history item
 */
export default function HistoryPanel({ history, onSelect }) {
  return (
    <div className="history-panel">
      {history && history.length > 0 ? (
        history.map((entry, idx) => <HistoryItem key={idx} entry={entry} onSelect={onSelect} />)
      ) : (
        <div className="history-empty">No history yet</div>
      )}
    </div>
  );
}
