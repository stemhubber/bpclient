import React from "react";
import "./styles/CommitModal.css";

export default function CommitModal({ onCommit, onUndo }) {
  return (
    <div className="commit-modal">
      <div className="modal-content">
        <h3>You have unsaved changes</h3>
        <p>Would you like to commit or undo your changes before leaving?</p>
        <div className="modal-actions">
          <button onClick={onCommit} className="save-btn">💾 Save Changes</button>
          <button onClick={onUndo} className="undo-btn">↩️ Undo Changes</button>
        </div>
      </div>
    </div>
  );
}
