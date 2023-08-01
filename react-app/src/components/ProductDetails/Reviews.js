import { FaStar } from "react-icons/fa";

function Review({product}) {
    return (
        <div>
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
                            <div>
                                <p>{review.user.first_name}</p>
                                <p>{review.user.last_name}</p>
                            </div>
                            <div>
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
