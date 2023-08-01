import { dataNormalizer } from "./utilities";

// Action strings.

const GET_ALL_PRODUCTS = "get_products/GET";
const CREATE_PRODUCT = "create_product/POST";
const EDIT_PRODUCT = "edit_product/POST";
const ADD_REVIEW_TO_PRODUCT = "add_review_to_product/POST"


// Actions

const getProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  data: products,
});

const makeProduct = (product) => ({
  type: CREATE_PRODUCT,
  data: product,
});

const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  data: product,
});

const addReview = (reviewObj) => ({
  type: ADD_REVIEW_TO_PRODUCT,
  reviewObj
})

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
    return newProduct.id;
  }
};

export const editProductThunk = (product) => async (dispatch) => {
  const id = product.product_id;
  delete product.product_id;
  const response = await fetch(`/api/products/edit/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (response.ok) {
    const editedProduct = await response.json();
    dispatch(editProduct(editedProduct));
    return editedProduct.id;
  }
};

export const addReviewThunk = (reviewInfo) => async (dispatch) => {
  const response = await fetch("/api/reviews/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewInfo),
  })

  if (response.ok) {
    const reviewObj = await response.json();

    // send this back to handle errors on the front end
    if(reviewObj.errors) {
      return reviewObj
    }

    dispatch(addReview(reviewObj))
    return reviewObj
    
  }

}

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
      newState[newProduct.id] = newProduct;
      return newState;
    }
    case EDIT_PRODUCT: {
      const newState = { ...state };
      const editedProduct = action.data;
      newState[editedProduct.id] = editedProduct;
      return newState;
    }
    case ADD_REVIEW_TO_PRODUCT: {
      const newState = {...state }
      newState[action.reviewObj.product_id].product_reviews.push(action.reviewObj)
      return newState
    }
    default: {
      return state;
    }
  }
}
