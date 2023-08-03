// Action strings.

const GET_ALL_ORDERS = "get_orders/GET";
const DELETE_ORDER = "delete_orders/DELETE";
const ADD_ORDER = 'add_order/POST'

// Actions

const getAllOrders = (orders) => ({
  type: GET_ALL_ORDERS,
  data: orders,
});

const deleteOrder = (batchId) => ({
  type: DELETE_ORDER,
  data: batchId
})

const addOrder = (order) => ({
  type: ADD_ORDER,
  order
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

  // if(response.ok) {
  //   const newOrderStatus = await response.json()
  //   return newOrderStatus
  // }

}

//REMOVE_ORDER
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


//CREATE_ORDER
export const createOrderThunk = (uID, cart, total) => async (dispatch) =>{
  let todayx = new Date();
  let date = todayx.toISOString().slice(0,10)

  const res = await fetch('/api/orders/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      user: uID,
      cart,
      total,
      date
    })
  })
  if(res.ok){
    const order = await res.json();
    dispatch(addOrder(order));
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
      delete newState[action.data]
      return newState
    }
    case ADD_ORDER: {
      const newState = {...state};
      newState[action.order[0].batch_id] = action.order;
      return newState;
    }
    default: {
      return state;
    }
  }
}
