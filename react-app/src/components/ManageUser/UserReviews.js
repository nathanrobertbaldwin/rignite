import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsThunk } from "../../store/products";
import { getAllOrdersThunk } from "../../store/orders";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getUserReviewsThunk } from "../../store/reviews";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import EditReviewModal from "./EditReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";

function UserReviews() {

    const userReviews = useSelector((state) => state.reviews)
    const products = useSelector((state) => state.products)

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        // MEGATHUNKADONK
        if (!Object.values(userReviews).length){
            async function fetchData (){
            await dispatch(getAllProductCategoriesThunk());
            await dispatch(getAllProductsThunk());
            await dispatch(getAllOrdersThunk());
            await dispatch(getUserReviewsThunk());
        }
            fetchData()
        }
    }, [dispatch]);

    return (
        <div id='manage-account-main-container'>

            <div id='account-nav-sidebar'>
                <h2>Options</h2>
                <button onClick={()=>history.push('/users/manage')} className='account-nav-buttons'>My Info</button>
                <button onClick={()=>history.push('/users/delete')} className='account-nav-buttons'>Account Settings</button>
                <button className='account-nav-buttons'>Manage Reviews</button>
            </div>

            <div id="manage-reviews-main-container">
                {Object.values(userReviews)?.map((review) => {
                    return <div key={review.id} className="single-user-review">
                        <h3>{products[review.product_id].product_name}</h3>
                        <p>{review.review}</p>
                        <div id='manage-reviews-buttons'>
                            <button onClick={() => history.push(`/products/${review.product_id}`)}>See Product Page</button>
                            <OpenModalButton buttonText={"Edit"} modalComponent={<EditReviewModal reviewData={review} reviewId={review.id} />} />
                            <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteReviewModal productId={review.product_id} reviewId={review.id} />} />
                        </div>
                    </div>;
                })}
            </div>

        </div>
    )
}

export default UserReviews
