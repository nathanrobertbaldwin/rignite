import { dataNormalizer } from "./utilities";

// Action strings.

const GET_ALL_PHOTOS = "get_photos/GET";

// Actions

const getPhotos = (photos) => ({
  type: GET_ALL_PHOTOS,
  data: photos,
});

// Thunks

export const getAllPhotosThunk = () => async (dispatch) => {
  const response = await fetch("/api/photos/all");

  if (response.ok) {
    const data = await response.json();
    dispatch(getPhotos(data));
  }
};

// Images reducer

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PHOTOS: {
      const allPhotos = action.data;
      const normalizedPhotos = dataNormalizer(allPhotos)
      return {
        ...state,
        ...normalizedPhotos,
      };
    }
    default: {
      return state;
    }
  }
}
