import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { manageAProductThunk } from "../../store/spots";
import "./ManageProductModal.css";

export default function ManageSpotModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const handleConfirmation = (e) => {
    dispatch(deleteASpotBySpotIdThunk(spot.id));
    closeModal();
    history.push("/spots/current");
  };

  const handleDenial = (e) => {
    e.preventDefault();
    closeModal();
    history.push("/spots/current");
  };
  return (
    <div id="delete_spot_modal_container">
      <h1 id="delete_spot_modal_h1">Confirm Delete</h1>
      <button
        type="button"
        className="button_small"
        onClick={handleConfirmation}
      >
        Yes (Delete Spot)
      </button>
      <button type="button" className="button_large" onClick={handleDenial}>
        No (Keep Spot)
      </button>
    </div>
  );
}
