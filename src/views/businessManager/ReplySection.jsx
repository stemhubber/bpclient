import React, { useState } from "react";

function ReplySection({ replies = [] }) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="reply-section">
      <button
        className="toggle-replies-btn"
        onClick={() => setShowReplies(!showReplies)}
      >
        {showReplies ? "Hide Replies" : `View Replies (${replies.length})`}
      </button>

      <div className={`reply-view ${showReplies ? "open" : ""}`}>
        {replies.map((reply, i) => (
          <div className="reply-item" key={i}>
            <div className="avatar-circle small">
              {reply.user.avatar || reply.user.name[0]}
            </div>
            <div className="reply-content">
              <strong>{reply.user.name}</strong>
              <p>{reply.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReplySection;
