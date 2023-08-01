// Action strings.

const GET_ALL_ORDERS = "get_orders/GET";
// const EDIT_ORDER_STATUS = "put_orders/EDIT_ORDER_STATUS";

// Actions

const getAllOrders = (orders) => ({
  type: GET_ALL_ORDERS,
  data: orders,
});

// const editOrderStatus = (updatedOrderInfo) => ({
//   type: EDIT_ORDER_STATUS,
//   data: updatedOrderInfo
// })

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

export const editOrderStatusThunk = (batchId, status) => async (dispatch) => {
  const response = await fetch(`/api/orders/${batchId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(status)
	})

  // if (response.ok) {
  //   const data = await response.json();
  //   dispatch(editOrderStatus(data))
  // }
}

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
    // case EDIT_ORDER_STATUS: {
    //   return {
    //     ...state,
    //     [action.data.batch_id]: action.data
    //   }
    // }
    default: {
      return state;
    }
  }
}
