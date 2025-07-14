import React, { useState, useEffect, useRef } from "react";
import "./styles/ReviewSlider.css";
import {
  getReviewsForStore,
  addReview,
  likeReview,
//   addReply,
} from "../../services/ReviewsController";
import AuthPage from '../../auth/AuthPages';
// import ReplyForm from "./ReplyForm";
// import ReplySection from "./ReplySection";

export default function ReviewSlider({ storeId }) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef(null);
  const [wantsToWriteReview, setWantsToWriteReview] = useState(false);

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("bitepilot_user")));

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    media: "",
    user: { name: currentUser?.name, avatar: "" },
  });

  useEffect(() => {
    fetchReviews();
  }, [storeId]);

  const fetchReviews = async () => {
    try {
      const data = await getReviewsForStore(storeId);
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews:", err.message);
    }
  };

  const generateInitialAvatar = (name) => {
    const initials = name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return initials || "AN";
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comment || !newReview.rating) return;

    setLoading(true);
    try {
      await addReview(
        {
          ...newReview,
          storeId,
          user: {
            name: currentUser?.name,
            avatar: generateInitialAvatar(currentUser?.name),
          },
        },
        uploadFile
      );
      setNewReview({ rating: 0, comment: "", media: "", user: { name: currentUser?.name, avatar: "" } });
      setUploadFile(null);
      setShowForm(false);
      fetchReviews();
    } catch (err) {
      console.error("Error submitting review:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaChange = (e) => {
    if (e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleLike = async (reviewId) => {
    try {
      await likeReview(reviewId);
      fetchReviews();
    } catch (err) {
      console.error("Error liking review:", err.message);
    }
  };

  return (
    <div className="review-slider-wrapper">
      <h3>Testimonials</h3>
      {!currentUser && wantsToWriteReview &&  <AuthPage onUserLoggedIn={setCurrentUser} dontNavigate={true}/>}

      <div className="slider" ref={sliderRef}>
        

        {/* Review Cards */}
        {reviews.map((review, idx) => (
          <div className="review-card" key={idx}>
            <div className="review-header">
              <div className="avatar-circle">
                {generateInitialAvatar(review.user.name)}
              </div>
              <div className="review-meta">
                <strong>{review.user.name}</strong>
                <div className="stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="comment">"{review.comment}"</p>

            {review.media && (
              <div className="media">
                {review.media.includes("video") ? (
                  <video src={review.media} controls muted autoPlay playsInline loop style={{ width: "100%", borderRadius: "8px", maxHeight: "200px", objectFit: "cover" }}/>
                ) : (
                  <img src={review.media} alt="Review Media" />
                )}
              </div>
            )}

            <div className="review-actions">
              <button onClick={() => handleLike(review.id)}>
                ❤️ {review.likes || 0}
              </button>
              {/* <ReplySection replies={review.replies}></ReplySection>
              <ReplyForm reviewId={review.id} onReplySuccess={fetchReviews} /> */}

            </div>
          </div>
        ))}

        {/* Add Review Card */}
        <div className="review-card add-card">
          {!showForm ? (
            <button className="write-btn" onClick={() => {setShowForm(true);setWantsToWriteReview(true)}}>
              Write a Review
            </button>
          ) : (
            <div>
              

            <form onSubmit={handleReviewSubmit}>
              <input type="text" value={currentUser?.name} readOnly />

              <div className="star-input-wrapper">
                <div className="star-input">
                    {[1, 2, 3, 4, 5].map((i) => (
                    <span
                        key={i}
                        className={i <= newReview.rating ? "filled" : ""}
                        onClick={() => setNewReview({ ...newReview, rating: i })}
                    >
                        ★
                    </span>
                    ))}
                </div>
                </div>

                            <textarea
                placeholder="Write your review..."
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              />
              <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
