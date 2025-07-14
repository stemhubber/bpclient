// services/ReviewsController.js
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  arrayUnion,
  increment,
} from 'firebase/firestore';
import { db } from './firebase';
import { uploadFile } from './MediaController';

/**
 * Get all reviews for a given store, sorted by highest rating first
 * @param {string} storeId
 * @returns {Promise<Array>} reviews
 */
export async function getReviewsForStore(storeId) {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef,
      where('storeId', '==', storeId),
      orderBy('rating', 'desc') // Highest first
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Could not fetch reviews.');
  }
}

/**
 * Add a new review to Firestore with optional media file
 * @param {Object} review - review data
 * @param {File} [file] - media file
 * @returns {Promise<string>} - document ID
 */
export async function addReview(review, file) {
  try {
    let mediaUrl = review.media || '';

    if (file) {
      const path = `media/reviews/${Date.now()}_${file.name}`;
      mediaUrl = await uploadFile(file, 'media/reviews');
    }

    const initials = review.user?.name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase() || 'A';

    const newReview = {
      storeId: review.storeId,
      rating: review.rating,
      comment: review.comment,
      media: mediaUrl,
      createdAt: Date.now(),
      likes: 0,
      replies: [],
      user: {
        name: review.user?.name || 'Anonymous',
        avatar: review.user?.avatar || initials,
      },
    };

    const docRef = await addDoc(collection(db, 'reviews'), newReview);
    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw new Error('Could not add review.');
  }
}

/**
 * Update a review with new data
 * @param {string} reviewId
 * @param {Object} updatedData
 * @returns {Promise<void>}
 */
export async function updateReview(reviewId, updatedData) {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewRef, updatedData);
  } catch (error) {
    console.error('Error updating review:', error);
    throw new Error('Could not update review.');
  }
}

/**
 * Delete a review
 * @param {string} reviewId
 * @returns {Promise<void>}
 */
export async function deleteReview(reviewId) {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    await deleteDoc(reviewRef);
  } catch (error) {
    console.error('Error deleting review:', error);
    throw new Error('Could not delete review.');
  }
}

/**
 * Add a like reaction to a review
 * @param {string} reviewId
 * @returns {Promise<void>}
 */
export async function likeReview(reviewId) {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewRef, {
      likes: increment(1),
    });
  } catch (error) {
    console.error('Error liking review:', error);
    throw new Error('Could not like review.');
  }
}

/**
 * Add a reply to a review
 * @param {string} reviewId
 * @param {Object} reply - { user: { name, avatar }, message: string }
 * @returns {Promise<void>}
 */
export async function addReply(reviewId, reply) {
  try {
    const initials = reply.user?.name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase() || 'A';

    const replyPayload = {
      message: reply.message,
      user: {
        name: reply.user?.name || 'Anonymous',
        avatar: reply.user?.avatar || initials,
      },
      createdAt: Date.now(),
    };

    const reviewRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewRef, {
      replies: arrayUnion(replyPayload),
    });
  } catch (error) {
    console.error('Error replying to review:', error);
    throw new Error('Could not add reply.');
  }
}
