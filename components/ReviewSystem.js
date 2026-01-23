import React, { useState, useEffect } from 'react';
import { Star, User, ThumbsUp, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ReviewSystem = ({ productId, productName }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    recommend: true
  });

  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews-${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [productId]);

  const submitReview = () => {
    if (!user) {
      alert('Please login to submit a review');
      return;
    }

    const review = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      recommend: newReview.recommend,
      date: new Date().toISOString(),
      helpful: 0
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updatedReviews));
    
    // Save to global reviews
    const allReviews = JSON.parse(localStorage.getItem('all-reviews') || '[]');
    allReviews.push({ ...review, productId, productName });
    localStorage.setItem('all-reviews', JSON.stringify(allReviews));

    setNewReview({ rating: 5, title: '', comment: '', recommend: true });
    setShowReviewForm(false);
  };

  const markHelpful = (reviewId) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    );
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updatedReviews));
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-text-dark">Customer Reviews</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {[1,2,3,4,5].map(star => (
                <Star 
                  key={star} 
                  className={`w-4 h-4 ${star <= averageRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {averageRating} out of 5 ({reviews.length} reviews)
            </span>
          </div>
        </div>
        
        {user && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-primary-maroon text-white px-4 py-2 rounded-lg hover:bg-deep-maroon transition-colors"
          >
            Write Review
          </button>
        )}
      </div>

      {showReviewForm && (
        <div className="bg-soft-beige rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-4">Write Your Review</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    onClick={() => setNewReview({...newReview, rating: star})}
                    className="p-1"
                  >
                    <Star 
                      className={`w-6 h-6 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Review title"
              value={newReview.title}
              onChange={(e) => setNewReview({...newReview, title: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />

            <textarea
              placeholder="Share your experience..."
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
              rows="3"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newReview.recommend}
                onChange={(e) => setNewReview({...newReview, recommend: e.target.checked})}
              />
              <span className="text-sm">I recommend this product</span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={submitReview}
                className="bg-primary-maroon text-white px-4 py-2 rounded-lg hover:bg-deep-maroon transition-colors"
              >
                Submit Review
              </button>
              <button
                onClick={() => setShowReviewForm(false)}
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{review.userName}</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(star => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              
              {review.title && (
                <h5 className="font-semibold mb-2">{review.title}</h5>
              )}
              
              <p className="text-gray-700 mb-3">{review.comment}</p>
              
              {review.recommend && (
                <div className="text-green-600 text-sm mb-2">✓ Recommends this product</div>
              )}
              
              <button
                onClick={() => markHelpful(review.id)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-maroon transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpful})
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;