import React, { useEffect, useState } from "react";
import {
  getReviewsForStore,
  deleteReview,
} from "../../services/ReviewsController";
import "./styles/AdminReviewManager.css";

export default function AdminReviewManager({ storeId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsForStore(storeId);
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(id);
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [storeId]);

  return (
    <div className="admin-review-manager">
      <h2>Store Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found for this store.</p>
      ) : (
        <div className="review-list">
          {reviews.map((review) => (
            <div className="admin-review-card" key={review.id}>
              <div className="admin-review-header">
                <div className="avatar-circle small">
                  {review.user.avatar || review.user.name[0]}
                </div>
                <div>
                  <strong>{review.user.name}</strong>
                  <div className="stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="admin-comment">"{review.comment}"</p>
              {review.media && (
                <div className="admin-media">
                  {review.media.includes("video") ? (
                    <video
                      src={review.media}
                      controls
                      muted
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img src={review.media} alt="Review media" />
                  )}
                </div>
              )}
              <button
                className="delete-btn"
                onClick={() => handleDelete(review.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
