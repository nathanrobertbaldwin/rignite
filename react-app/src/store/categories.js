import { dataNormalizer } from "./utilities";

// Action strings.

const GET_ALL_PRODUCT_CATEGORIES = "get_categories/GET";

// Actions

const getAllProductCategories = (categories) => ({
  type: GET_ALL_PRODUCT_CATEGORIES,
  data: categories,
});

// Thunks

export const getAllProductCategoriesThunk = () => async (dispatch) => {
  const response = await fetch("/api/categories/all");

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllProductCategories(data));
  }
};

// Products reducer

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCT_CATEGORIES: {
      const allCategories = action.data;
      const normalizedAllCategories = dataNormalizer(allCategories);
      return {
        ...state,
        ...normalizedAllCategories,
      };
    }
    default: {
      return state;
    }
  }
}
