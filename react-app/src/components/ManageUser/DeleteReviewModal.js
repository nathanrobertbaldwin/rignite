import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import { getUserReviewsThunk } from "../../store/reviews";
import { deleteReviewThunk } from "../../store/products";

function DeleteReviewModal({productId, reviewId}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDeleteReview = async () => {

        return dispatch(deleteReviewThunk(reviewId, productId))
        .then( () => dispatch( getUserReviewsThunk()) )
        .then(closeModal)
        .catch(async (res) => console.log(res));

    }

    const handleCloseModal = () => {
        closeModal()
    }


    return (
        <div id="delete-review-modal-main-container">
            <div className="">
                <h2 className="">Confirm Delete</h2>
                <h3 className="">Are you sure you want to deactive this review?</h3>
                <div className="">
                    <button onClick={handleDeleteReview} className="">Yes (Delete Review)</button>
                    <button onClick={handleCloseModal} className="">No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteReviewModal
