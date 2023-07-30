// Action strings.

const GET_ALL_PRODUCTS = "get_products/GET";

// Actions

const getProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  data: products,
});

// Thunks

export const getAllProductsThunk = () => async (dispatch) => {
  const response = await fetch("/api/products/all");

  if (response.ok) {
    const data = await response.json();
    dispatch(getProducts(data));
  }
};

// Normalizer

// const normalizer = (data) => {};

// Products reducer

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS: {
      const allProducts = action.data;
      return {
        ...state,
        ...allProducts,
      };
    }
    default: {
      return state;
    }
  }
}
