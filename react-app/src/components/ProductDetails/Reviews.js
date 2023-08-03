import CreateReviewModal from "./CreateReviewModal";
import OpenModalButton from "../OpenModalButton";
import "./Review.css"


function Review({product, user}) {

    const doesUserHaveReview = product.product_reviews.find((review) => review.user.id === user?.id)

    const productSumRating = product.product_reviews.reduce( (total, review) => total + review.rating, 0);
    let productAverageRating = (productSumRating / product.product_reviews.length).toFixed(1)
    if (isNaN(productAverageRating)) productAverageRating = "0.0"

    // user recommends product if review rating is 3 or higher
    const numPeopleThatRecommend = product.product_reviews.filter((review) => review.rating >= 3)
    let wouldRecommendPercentage = (numPeopleThatRecommend.length / product.product_reviews.length) * 100
    if (isNaN(wouldRecommendPercentage)) wouldRecommendPercentage = "0"

    // array to populate that will create a star for product rating 1-5
    const arrToDisplayStarView = []
    for(let i = 1; i <= Math.floor(productAverageRating); i++) {
        arrToDisplayStarView.push(i)
    }


    return (
        <div id="review-component-main-container">
            <div id="create-review-modal-button-container">
                {doesUserHaveReview === undefined && user
                ? <OpenModalButton buttonText={"Post Review"} modalComponent={<CreateReviewModal user={user} productId={product.id} />} />
                : null}
            </div>
            <h2>Customer Reviews</h2>
            <div id="product-review-details-overview-container">
                <h2>{productAverageRating}</h2>
                <div id="review-detail-view-container">
                    <div id="star-rating-mapping-container">
                        {arrToDisplayStarView.map((i) => (
                            <span className="star-fill-average-rating" key={i}>★</span>
                        ))}
                        <span id="reviewCount">( {product.product_reviews.length} reviews ) </span>
                    </div>
                    <p>{wouldRecommendPercentage}% of buyers would recommend to a friend</p>
                </div>
            </div>
                <div id="reviews-container">
                    {product.product_reviews.map((review) => {
                        return <div key={review.id} id="single-review">
                            <div className="review-user-info">
                                <p>{review.user.first_name} {review.user.last_name}</p>
                                <p id="verified-buyer">☑ Verified Buyer</p>
                            </div>
                            <div className="review-info">
                                {/* way to build an array iterable and populate it with elements using JSX */}
                                {Array.from({length: review.rating}).map((x, index) => {
                                    return <span className="star-fill-average-rating" key={index}>★</span>
                                })}
                                <p>{review.review}</p>
                                <p>Recommends this product? {review.rating >= 3 ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    })}
                </div>
        </div>
    )
}

export default Review
