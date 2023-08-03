// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const UPDATE_USER = "session/UPDATE_USER";
const DELETE_USER = "session/DELETE_USER"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const editUser = (updatedInfo) => ({
	type: UPDATE_USER,
	payload: updatedInfo
})

const deleteUser = () => ({
	type: DELETE_USER,
	payload: null
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, firstname, lastname, address, city, state, zipcode, admin, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			first_name: firstname,
			last_name: lastname,
			address,
			city,
			state,
			zip_code: zipcode,
			is_admin: "True"
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const updateUser = (formData) => async (dispatch) => {
	const response = await fetch("/api/users/manage", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData)
	})

	if(response.ok) {
		const thunkResponse = await response.json()
		dispatch(editUser(thunkResponse))
		return thunkResponse
	}
}

export const deleteUserAccount = () => async (dispatch) => {
	const response = await fetch("/api/users/delete", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	})

	if(response.ok) {
		dispatch(deleteUser())
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case UPDATE_USER:
			return {user: action.payload}
		case DELETE_USER:
			return {user: action.payload}
		default:
			return state;
	}
}
