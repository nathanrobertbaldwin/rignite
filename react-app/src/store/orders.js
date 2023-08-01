// Action strings.

const GET_ALL_ORDERS = "get_orders/GET";
const DELETE_ORDER = "delete_orders/DELETE"

// Actions

const getAllOrders = (orders) => ({
  type: GET_ALL_ORDERS,
  data: orders,
});

const deleteOrder = (batchId) => ({
  type: DELETE_ORDER,
  data: batchId
})

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

export const editOrderStatusFetch = (batchId, status) => async () => {
  const response = await fetch(`/api/orders/${batchId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(status)
	})

  if(response.ok) {
    const newOrderStatus = await response.json()
    return newOrderStatus
  }

}

//REMOVE_SPOT
export const deleteOrderThunk = (batchId) => async (dispatch) => {
  const response = await fetch(`/api/orders/${batchId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
  })

  if(response.ok) {
      const message = await response.json()
      dispatch(deleteOrder(batchId))
      return message
  }
}

// Orders reducer

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
    case DELETE_ORDER: {
      const newState = {...state}
      delete newState[action.data.batchId]
    }
    default: {
      return state;
    }
  }
}
