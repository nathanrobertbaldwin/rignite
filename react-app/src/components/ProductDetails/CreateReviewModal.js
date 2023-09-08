import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { addReviewThunk } from '../../store/products';
import { getUserReviewsThunk } from '../../store/reviews';
import "./CreateReviewModal.css"

function CreateReviewModal({user, productId}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState(0)
    const [photoUrl, setPhotoUrl] = useState("")

    const [highlight, setHighlight] = useState(0)
    const [formErrors, setFormErrors] = useState({})

    const handleReviewSubmit = async (e) => {
        e.preventDefault()

        let valueForPhotoUrl;
        if(photoUrl === "") {
            valueForPhotoUrl = null
        } else {
            valueForPhotoUrl = photoUrl
        }

        if(reviewText.length > 255) {
            const errors = {}
            errors.review = "Review cannot exceed 255 characters"
            setFormErrors(errors)
            return
        }

        const reviewObj = {
            user_id: user.id,
            product_id: productId,
            review: reviewText,
            rating: rating,
            photo_url: valueForPhotoUrl
        }

        const response = await dispatch(addReviewThunk(reviewObj))

        if(response.errors) {
            const errors = response.errors
            setFormErrors(errors)
        } else {
            await dispatch(getUserReviewsThunk())
            closeModal()
        }

    }

    return (
        <div id="review-modal-main-container">
            <form onSubmit={handleReviewSubmit}>

                <div id="star-container">
                    <div className="stars">
                        {formErrors.rating && <div className='form-errors star-errors'>{formErrors.rating}</div>}
                        <div>
                        <FaStar className={`single-star ${rating >= 1 ? "activestar" : ""}`} id={highlight >= 1 ? "highlight" : ""} value={rating}
                        onClick={() => setRating(1)} onMouseMoveCapture={() => setHighlight(1)} onMouseLeave={() => setHighlight("")} />

                        <FaStar className={`single-star ${rating >= 2 ? "activestar" : ""}`} id={highlight >= 2 ? "highlight" : ""} value={rating}
                        onClick={() => setRating(2)} onMouseMoveCapture={() => setHighlight(2)} onMouseLeave={() => setHighlight("")} />

                        <FaStar className={`single-star ${rating >= 3 ? "activestar" : ""}`} id={highlight >= 3 ? "highlight" : ""} value={rating}
                        onClick={() => setRating(3)} onMouseMoveCapture={() => setHighlight(3)} onMouseLeave={() => setHighlight("")} />

                        <FaStar className={`single-star ${rating >= 4 ? "activestar" : ""}`} id={highlight >= 4 ? "highlight" : ""} value={rating}
                        onClick={() => setRating(4)} onMouseMoveCapture={() => setHighlight(4)} onMouseLeave={() => setHighlight("")} />

                        <FaStar className={`single-star ${rating >= 5 ? "activestar" : ""}`} id={highlight >= 5 ? "highlight" : ""} value={rating}
                        onClick={() => setRating(5)} onMouseMoveCapture={() => setHighlight(5)} onMouseLeave={() => setHighlight("")} />
                        </div>
                    </div>
                </div>

                <div>
                    <textarea
                        className='review-textarea'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder='Please take a moment to write a review and rate this product...'
                    />
                </div>
                    {formErrors.review && <span className='form-errors'>{formErrors.review}</span>}


                {/* <div id='photo-url-container'>
                    <label htmlFor="photo-url">Image File Upload:</label>
                    <input
                        id='photo-url'
                        type='text'
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder='Feel free to include an image to support your review...'
                    />
                </div> */}

                <div id="review-button-container">
                    <button className="review-submit-button" type="submit">Submit Review</button>
                </div>
            </form>
        </div>
    )
}

export default CreateReviewModal
