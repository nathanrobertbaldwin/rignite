// Action strings.

const GET_ALL_ORDERS = "get_orders/GET";

// Actions

const getAllOrders = (orders) => ({
  type: GET_ALL_ORDERS,
  data: orders,
});

// Thunks

export const getAllOrdersThunk = () => async (dispatch) => {
  const response = await fetch("/api/orders/");

  if (response.ok) {
    const data = await response.json();
    let normalizedData = {};
    data.forEach(order => {
        if (!normalizedData[order.batch_id]) normalizedData[order.batch_id] = [];
        normalizedData[order.batch_id].push(order);
    });
    dispatch(getAllOrders(normalizedData));
  }
};

// Products reducer

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS: {
        //normalized in thunk: too much logic
      return {
        ...state,
        ...action.data,
      };
    }
    default: {
      return state;
    }
  }
}
