import React, { useState } from "react";
import { addReply } from "../../services/ReviewsController";

export default function ReplyForm({ reviewId, onReplySuccess }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(sessionStorage.getItem("bitepilot_user"));
  const userName = currentUser?.name || "Anonymous";

  const handleReply = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      await addReply(reviewId, {
        message,
        user: {
          name: userName,
        },
      });
      setMessage("");
      onReplySuccess?.(); // refresh parent
    } catch (err) {
      console.error("Failed to reply:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReply} className="reply-form">
      <textarea
        placeholder="Write a reply..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Replying..." : "Reply"}
      </button>
    </form>
  );
}
