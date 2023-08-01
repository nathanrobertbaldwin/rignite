import { FaStar } from "react-icons/fa";
import CreateReviewModal from "./CreateReviewModal";
import OpenModalButton from "../OpenModalButton";


function Review({product, user}) {

    const doesUserHaveReview = product.product_reviews.find((review) => review.user.id === user.id)

    return (
        <div>
            {doesUserHaveReview === undefined ? <OpenModalButton buttonText={"Post Review"} modalComponent={<CreateReviewModal user={user} productId={product.id} />} /> : null}
            <h2>Customer Reviews</h2>
            <div id="product-review-details-overview-container">
                <h2>AVERAGE STAR RATING DECIMAL</h2>
                <div>
                    <p> ...insert star view here...</p>
                    <p>(# reviews here) reviews</p>
                    <p>( ___ percent) would recommend to a friend</p>
                </div>
            </div>
                <div id="reviews-container">
                    {product.product_reviews.map((review) => {
                        return <div key={review.id} id="single-review">
                            <div className="review-user-info">
                                <p>{review.user.first_name}</p>
                                <p>{review.user.last_name}</p>
                            </div>
                            <div className="review-info">
                                <p>{review.rating}</p>
                                <p>{review.review}</p>
                            </div>
                        </div>
                    })}
                </div>
        </div>
    )
}

export default Review
