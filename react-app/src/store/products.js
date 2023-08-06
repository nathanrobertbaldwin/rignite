import { dataNormalizer } from "./utilities";

// Action strings.

const GET_ALL_PRODUCTS = "get_products/GET";
const CREATE_PRODUCT = "create_product/POST";
const EDIT_PRODUCT = "edit_product/POST";
const ADD_REVIEW_TO_PRODUCT = "add_review_to_product/POST";
const EDIT_REVIEW = "edit_review/PUT";
const DELETE_REVIEW = "delete_review/DELETE";

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
  reviewObj,
});

const editReview = (reviewObj) => ({
  type: EDIT_REVIEW,
  reviewObj,
});

const deleteReview = (reviewInfoArr) => ({
  type: DELETE_REVIEW,
  reviewInfoArr,
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
  console.log("From the THUNK", product);
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

  const response = await fetch(`/api/products/${id}`, {
    method: "PATCH",
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
  });

  if (response.ok) {
    const reviewObj = await response.json();

    // send this back to handle errors on the front end
    if (reviewObj.errors) {
      return reviewObj;
    }

    dispatch(addReview(reviewObj));
    return reviewObj;
  }
};

export const editReviewThunk = (reviewId, reviewInfo) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewInfo),
  });

  if (response.ok) {
    const reviewObj = await response.json();

    // send this back to handle errors on the front end
    if (reviewObj.errors) {
      return reviewObj;
    }

    dispatch(editReview(reviewObj));
    // dispatch()
    return reviewObj;
  }
};

export const deleteReviewThunk = (reviewId, productId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(deleteReview([reviewId, productId]));
  }
};

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
      const newState = { ...state };
      newState[action.reviewObj.product_id].product_reviews.push(
        action.reviewObj
      );
      return newState;
    }
    case EDIT_REVIEW: {
      const newState = { ...state };
      const productReviewArray =
        newState[action.reviewObj.product_id].product_reviews;
      const indexToReplace = productReviewArray.findIndex(
        (review) => review.id === action.reviewObj.id
      );
      productReviewArray[indexToReplace] = action.reviewObj;
      return newState;
    }
    case DELETE_REVIEW: {
      const [reviewId, productId] = action.reviewInfoArr;
      const newState = { ...state };

      const productReviewArray = newState[productId].product_reviews;
      const indexToDelete = productReviewArray.findIndex(
        (review) => review.id === reviewId
      );
      productReviewArray.splice(indexToDelete, 1);
      return newState;
    }
    default: {
      return state;
    }
  }
}
