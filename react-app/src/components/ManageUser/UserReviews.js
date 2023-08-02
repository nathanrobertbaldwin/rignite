import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsThunk } from "../../store/products";
import { getAllOrdersThunk } from "../../store/orders";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getUserReviewsThunk } from "../../store/reviews";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import EditReviewModal from "./EditReviewModal";

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
                <button onClick={()=>history.push('/users/manage')}>My Info</button>
                <button onClick={()=>history.push('/users/delete')}>Account Settings</button>
                <button onClick={()=>history.push('/users/reviews')}>Manage Reviews</button>
            </div>

            <div>
                {Object.values(userReviews)?.map((review) => {
                    return <div key={review.id}>
                        <h3>{products[review.product_id].product_name}</h3>
                        <p>{review.review}</p>
                        <button onClick={() => history.push(`/products/${review.product_id}`)}>See Product Page</button>
                        <OpenModalButton buttonText={"Edit Review"} modalComponent={<EditReviewModal reviewData={review} reviewId={review.id} />} />
                    </div>;
                })}
            </div>

        </div>
    )
}

export default UserReviews
