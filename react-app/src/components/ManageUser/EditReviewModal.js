import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import { FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { editReviewThunk } from '../../store/products';
import { getUserReviewsThunk } from '../../store/reviews';

function EditReviewModal({reviewId, reviewData}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState(0)
    const [photoUrl, setPhotoUrl] = useState("")

    const [highlight, setHighlight] = useState(0)
    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {

        setReviewText(reviewData.review)
        setRating(reviewData.rating)
        setPhotoUrl(reviewData.photo_url)

    }, [dispatch])

    const handleEditReviewSubmit = async (e) => {
        e.preventDefault()

        let valueForPhotoUrl;
        if(photoUrl === "") {
            valueForPhotoUrl = null
        } else {
            valueForPhotoUrl = photoUrl
        }

        const reviewInfo = {
            review: reviewText,
            rating: rating,
            photo_url: valueForPhotoUrl
        }

        const response = await dispatch(editReviewThunk(reviewId, reviewInfo))

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
            <form onSubmit={handleEditReviewSubmit}>

                <div>
                    <textarea
                        className='review-textarea'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder='What did you think of this product?'
                    />
                    {formErrors.review && <span className='form-errors'>{formErrors.review}</span>}
                </div>

                <div id="star-container">
                    <div className="stars">
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
                        <span className="star-text">Stars</span>
                    </div>
                    {formErrors.rating && <span className='form-errors'>{formErrors.rating}</span>}
                </div>

                <div>
                    <label htmlFor="photo-url">Review Image File</label>
                    <input
                        id='photo-url'
                        type='text'
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder='Attach Review Image Url'
                    />
                    {formErrors.username && <span className='form-errors'>{formErrors.username[0]}</span>}
                </div>

                <div id="review-button-container">
                    <button className="review-submit-button" type="submit">Submit your Review</button>
                </div>
            </form>
        </div>
    )
}

export default EditReviewModal
