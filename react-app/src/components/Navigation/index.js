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
    <div id="nav_container">
      <div id="nav_links_container">
        <div id="nav_links_left">
          <NavLink exact to="/">
            <h2>Home</h2>
          </NavLink>
          <NavLink exact to="/products/all">
            <h2>Shop All Products</h2>
          </NavLink>
        </div>
        <div id="nav_links_right">
          <ul className="navi-icons">
            {sessionUser?.is_admin && (
              <OpenModalButton
                className="product_modal_button"
                buttonText="Add A Product"
                modalComponent={<AddProductModal />}
              />
            )}
            {sessionUser && (
              <OpenModalButton
                className="see-cart-modal"
                buttonText="🛒"
                modalComponent={<SeeCartModal addProduct={false} />}
              />
            )}
            {isLoaded && (
              <li id="profButt">
                <ProfileButton user={sessionUser} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
