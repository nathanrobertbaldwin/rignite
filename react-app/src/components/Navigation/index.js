import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import AddProductModal from "../AddProductModal";
import SeeCartModal from "../CartModal";
import OpenModalButton from "../OpenModalButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <ul className="navi-icons">
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/products/all">
          Shop
        </NavLink>
      </li>
      {sessionUser?.is_admin && (
        <OpenModalButton
          className="modal_button"
          buttonText="Add A Product"
          modalComponent={<AddProductModal />}
        />
      )}
      <OpenModalButton
          className="modal_button"
          buttonText="See your cart"
          modalComponent={<SeeCartModal addProduct={false}/>}
        />
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
