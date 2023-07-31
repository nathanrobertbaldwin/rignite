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