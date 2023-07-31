import dataNormalizer from "./utilities";

// Action strings.

const GET_ALL_REVIEWS = "get_reviews/GET";

// Actions

const getAllReviews = (reviews) => ({
  type: GET_ALL_REVIEWS,
  data: reviews,
});

// Thunks

export const getAllReviewsThunk = () => async (dispatch) => {
  const response = await fetch("/api/reviews/all");

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllReviews(data));
  }
};

// Products reducer

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_REVIEWS: {
      const allReviews = action.data;
      const normalizedReviews = dataNormalizer(allReviews);
      return {
        ...state,
        ...normalizedReviews,
      };
    }
    default: {
      return state;
    }
  }
}
