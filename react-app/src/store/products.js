import { dataNormalizer } from "./utilities";

// Action strings.

const GET_ALL_PRODUCTS = "get_products/GET";
const CREATE_PRODUCT = "create_product/POST";

// Actions

const getProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  data: products,
});

const makeProduct = (product) => ({
  type: CREATE_PRODUCT,
  data: product,
});

// Thunks

export const getAllProductsThunk = () => async (dispatch) => {
  const response = await fetch("/api/products/all");

  if (response.ok) {
    const data = await response.json();
    dispatch(getProducts(data));
  }
};

export const createNewProductThunk = (product) => async (dispatch) => {
  const response = await fetch("/api/products/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (response.ok) {
    const newProduct = await response.json();
    dispatch(makeProduct(newProduct));
    console.log("FROM THUNK,", newProduct);
    return newProduct.id;
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
      const normalizedProducts = dataNormalizer(allProducts);
      return {
        ...state,
        ...normalizedProducts,
      };
    }
    case CREATE_PRODUCT: {
      const newState = { ...state };
      const newProduct = action.data;
      console.log("FROM REDUCER,", newProduct);
      newState[newProduct.id] = newProduct
      return newState;
    }
    default: {
      return state;
    }
  }
}
