import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postNewSpotThunk } from "../../store/spots";
import { countries } from "./locations";
import { states } from "./locations";
import "./NewSpotForm.css";

export default function NewSpotForm() {

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  const [brand, setBrand] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [color, setColor] = useState("")


  return (<></>)
// color

// description

// price

// product_name

// specs


  // Error Checking

  // useEffect(() => {
  //   _checkForErrors();
  // }, [
  //   country,
  //   streetAddress,
  //   city,
  //   state,
  //   latitude,
  //   longitude,
  //   description,
  //   title,
  //   price,
  //   previewImage,
  //   imageOne,
  //   imageTwo,
  //   imageThree,
  //   imageFour,
  // ]);

  // // Submit Handler

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setHasSubmitted(true);

  //   if (Object.values(validationErrors).length === 0) {
  //     let data = {
  //       ownerId: userId,
  //       country,
  //       address: streetAddress,
  //       city,
  //       state,
  //       lat: latitude,
  //       lng: longitude,
  //       description,
  //       name: title,
  //       price,
  //       previewImage,
  //       imageOne,
  //       imageTwo,
  //       imageThree,
  //       imageFour,
  //     };

  //     const newSpot = await dispatch(postNewSpotThunk(data));
  //     _reset();
  //     history.push(`/spots/${newSpot.id}`);
  //   }
  // }

  // // Helper Functions

  // function _checkForErrors() {
  //   const errors = {};

  //   if (!countries.includes(country))
  //     errors.country = "Please enter a valid country (that exists IRL).";
  //   if (!streetAddress || !streetAddress.match(/^[a-zA-Z0-9. ]*$/))
  //     errors.streetAddress =
  //       "Please enter a valid alphanumeric street address.";
  //   if (!city || !city.match(/^[a-zA-Z ]*$/))
  //     errors.city = "Please enter a valid city.";
  //   if (!states.includes(state))
  //     errors.state = "Please enter a valid country (that exists IRL).";
  //   if (latitude < -90 || latitude > 90)
  //     errors.latitude = "A numeric latitude between -90 and 90.";
  //   if (longitude < -180 || longitude > 180)
  //     errors.longitude =
  //       "Please enter a numeric longitude between -180 and 180.";
  //   if (description.length < 30)
  //     errors.description = "Description needs a minimum of 30 characters";
  //   if (!title)
  //     errors.title = "Please enter a spot title of between 1 - 50 characters";
  //   if (!price) errors.price = "Please enter a valid price in US currency.";
  //   if (!previewImage)
  //     errors.previewImage = "Please enter a valid preview image url.";
  //   setValidationErrors(errors);
  // }

  // function _reset() {
  //   setCountry("");
  //   setStreetAddress("");
  //   setCity("");
  //   setState("");
  //   setLatitude(0);
  //   setLongitude(0);
  //   setDescription("");
  //   setTitle("");
  //   setPrice(0);
  //   setPreviewImage("");
  //   setImageOne("");
  //   setImageTwo("");
  //   setImageThree("");
  //   setImageFour("");
  //   setValidationErrors({});
  // }

  // // Component

  // return (
  //   <div id="new_spot_form_container">
  //     <h1 id="new_spot_form_h1">Create A New Spot</h1>
  //     <form id="new_spot_form" onSubmit={handleSubmit}>
  //       <div id="new_spot_form_section">
  //         <h4 id="new_spot_form_h4">Where's your place located?</h4>
  //         <p id="new_spot_form_p">
  //           Guests will only get your exact address once they booked a
  //           reservation.
  //         </p>
  //         <label>
  //           {validationErrors.country && hasSubmitted ? (
  //             <p>
  //               {"Country: "}
  //               <span className="error_message">
  //                 {validationErrors.country}
  //               </span>
  //             </p>
  //           ) : (
  //             "Country"
  //           )}
  //           <input
  //             id="new_spot_form_input"
  //             type="text"
  //             placeholder="Country"
  //             value={country}
  //             onChange={(e) => setCountry(e.target.value)}
  //           />
  //         </label>
  //         <label>
  //           {validationErrors.streetAddress && hasSubmitted ? (
  //             <p>
  //               {"Street Address: "}
  //               <span className="error_message">
  //                 {validationErrors.streetAddress}
  //               </span>
  //             </p>
  //           ) : (
  //             "Street Address"
  //           )}
  //           <input
  //             id="new_spot_form_input"
  //             type="text"
  //             placeholder="Street Address"
  //             value={streetAddress}
  //             onChange={(e) => setStreetAddress(e.target.value)}
  //           />
  //         </label>
  //         <label>
  //           {validationErrors.city && hasSubmitted ? (
  //             <p>
  //               {"City: "}
  //               <span className="error_message">{validationErrors.city}</span>
  //             </p>
  //           ) : (
  //             "City"
  //           )}
  //           <input
  //             id="new_spot_form_input"
  //             type="text"
  //             placeholder="City"
  //             value={city}
  //             onChange={(e) => setCity(e.target.value)}
  //           />
  //         </label>
  //         <label>
  //           {validationErrors.state && hasSubmitted ? (
  //             <p>
  //               {"State: "}
  //               <span className="error_message">{validationErrors.state}</span>
  //             </p>
  //           ) : (
  //             "State"
  //           )}
  //           <input
  //             id="new_spot_form_input"
  //             type="text"
  //             placeholder="State"
  //             value={state}
  //             onChange={(e) => setState(e.target.value)}
  //           />
  //         </label>
  //         <label>
  //           {validationErrors.latitude && hasSubmitted ? (
  //             <p>
  //               {"Latitude: "}
  //               <span className="error_message">
  //                 {validationErrors.latitude}
  //               </span>
  //             </p>
  //           ) : (
  //             "Latitude"
  //           )}
  //           <input
  //             id="new_spot_form_input"
  //             type="number"
  //             placeholder="Latitude"
  //             value={latitude}
  //             onChange={(e) => setLatitude(e.target.value)}
  //           />
  //         </label>
  //         <label>
  //           {validationErrors.longitude && hasSubmitted ? (
  //             <p>
  //               {"Longitude: "}
  //               <span className="error_message">
  //                 {validationErrors.longitude}
  //               </span>
  //             </p>
  //           ) : (
  //             "Longitude"
  //           )}
  //           <input
  //             id="new_spot_form_input"
  //             type="number"
  //             placeholder="Longitude"
  //             value={longitude}
  //             onChange={(e) => setLongitude(e.target.value)}
  //           />
  //         </label>
  //       </div>
  //       <div id="new_spot_form_section">
  //         <h4 id="new_spot_form_h4">Describe your place to guests</h4>
  //         <p id="new_spot_form_p">
  //           Mention the best features of your space, any special amentities like
  //           fast wif or parking, and what you love about the neighborhood.
  //         </p>
  //         <label>
  //           <textarea
  //             id="new_spot_spot_description_field"
  //             placeholder="Description"
  //             type="text"
  //             value={description}
  //             onChange={(e) => setDescription(e.target.value)}
  //             rows="6"
  //           />
  //           {validationErrors.description && hasSubmitted && (
  //             <span className="error_message">
  //               {validationErrors.description}
  //             </span>
  //           )}
  //         </label>
  //       </div>
  //       <div id="new_spot_form_section">
  //         <h4 id="new_spot_form_h4">Create a title for your spot</h4>
  //         <p id="new_spot_form_p">
  //           Catch guests' attention with a spot title that highlights what makes
  //           your place special
  //         </p>
  //         <label>
  //           <input
  //             id="new_spot_form_input"
  //             type="text"
  //             placeholder="Name Of Your Spot"
  //             value={title}
  //             onChange={(e) => setTitle(e.target.value)}
  //           />
  //         </label>
  //         {validationErrors.title && hasSubmitted && (
  //           <span className="error_message">{validationErrors.title}</span>
  //         )}
  //       </div>
  //       <div id="new_spot_form_section">
  //         <h4 id="new_spot_form_h4">Set a base price for your spot</h4>
  //         <p id="new_spot_form_p">
  //           Competitive pricing can help your listing stand out and rank higher
  //           in search results.
  //         </p>
  //         <label id="new_spot_form_price_label">
  //           <p id="new_form_dollar_sign">$&nbsp;&nbsp;</p>
  //           <input
  //             id="new_spot_form_input"
  //             type="number"
  //             step="0.01"
  //             placeholder="Price per night (USD)"
  //             value={price}
  //             onChange={(e) => setPrice(e.target.value)}
  //           />
  //           {validationErrors.price && hasSubmitted && (
  //             <span className="error_message">{validationErrors.price}</span>
  //           )}
  //         </label>
  //       </div>
  //       <div id="new_spot_form_section">
  //         <h4 id="new_spot_form_h4">Liven up your spot with photos</h4>
  //         <p id="new_spot_form_p">
  //           Submit a link to at least one photo to publish your spot.
  //         </p>
  //         <label>
  //           <input
  //             id="new_spot_form_input"
  //             type="url"
  //             placeholder="Preview Image URL"
  //             value={previewImage}
  //             onChange={(e) => setPreviewImage(e.target.value)}
  //           />
  //           {validationErrors.previewImage && hasSubmitted && (
  //             <span className="error_message">
  //               {validationErrors.previewImage}
  //             </span>
  //           )}
  //         </label>
  //         <label>
  //           <input
  //             id="new_spot_form_input"
  //             type="url"
  //             placeholder="Image URL"
  //             value={imageOne}
  //             onChange={(e) => setImageOne(e.target.value)}
  //           />
  //         </label>
  //         <label>
  //           <input
  //             id="new_spot_form_input"
  //             type="url"
  //             placeholder="Image URL"
  //             value={imageTwo}
  //             onChange={(e) => setImageTwo(e.target.value)}
  //           />
  //         </label>
  //         <label>
  //           <input
  //             id="new_spot_form_input"
  //             type="url"
  //             placeholder="Image URL"
  //             value={imageThree}
  //             onChange={(e) => setImageThree(e.target.value)}
  //           />
  //         </label>
  //         <label>
  //           <input
  //             id="new_spot_form_input"
  //             type="url"
  //             placeholder="Image URL"
  //             value={imageFour}
  //             onChange={(e) => setImageFour(e.target.value)}
  //           />
  //         </label>
  //       </div>
  //       <div id="new_spot_button_container">
  //         <button type="submit" className="button_small">
  //           Create Spot
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
}
