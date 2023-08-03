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
    <div id="nav_links_container">
      <ul className="navi-icons">
        <li id='home-link'>
          <NavLink exact to="/">
            <h1>Home</h1>
          </NavLink>
        </li>
        <li id='shop-link'>
          <NavLink exact to="/products/all">
            <h1>Shop</h1>
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
    </div>
  );
}

export default Navigation;
