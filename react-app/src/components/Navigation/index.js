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
      <li id='home-link'>
        <NavLink exact to="/">
          <h2>Home</h2>
        </NavLink>
      </li>
      <li id='shop-link'>
        <NavLink exact to="/products/all">
          <h2>Shop</h2>
        </NavLink>
      </li>
      {sessionUser?.is_admin && (
        <OpenModalButton
          className="product_modal_button"
          buttonText="Add A Product"
          modalComponent={<AddProductModal />}
        />
      )}
      {sessionUser && <OpenModalButton
          className="see-cart-modal"
          buttonText="See your cart"
          modalComponent={<SeeCartModal addProduct={false}/>}
        />}
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
