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
    <nav id="nav_container">
      <div id="nav_links_container">
        <div id="nav_links_left">
          <NavLink exact to="/">
            <div id="logo-container">
              <img
                alt="logo"
                id="logo"
                src="https://rignite-images.s3.us-east-2.amazonaws.com/rignite_logo.JPG"
              />
            </div>
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
    </nav>
  );
}

export default Navigation;
