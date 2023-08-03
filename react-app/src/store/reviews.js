import { dataNormalizer } from "./utilities";

const GET_ALL_USER_REVIEWS = "get_all_user_reviews/GET";

//ACTION

const getUserReviews = (reviews) => ({
    type: GET_ALL_USER_REVIEWS,
    data: reviews
});

//THUNK

export const getUserReviewsThunk = () => async (dispatch) => {
    const response = await fetch("/api/reviews/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getUserReviews(data));
    }

};


// Reviews reducer

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USER_REVIEWS: {
            const allReviews = action.data;
            const normalizedReviews = dataNormalizer(allReviews);
            return {
            ...normalizedReviews,
            };
        }
        default: {
            return state;
        }
    }
}
