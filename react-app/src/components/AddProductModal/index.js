import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewProductThunk } from "../../store/products";
import { useModal } from "../../context/Modal";
import "./AddProductModal.css";

export default function AddProductModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const [brand, setBrand] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [specs, setSpecs] = useState(["", "", ""]);
  const [price, setPrice] = useState("");
  const [product_name, setProductName] = useState("");
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [imageFour, setImageFour] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Error Checking

  useEffect(() => {
    _checkForErrors();
  }, [
    brand,
    category_id,
    color,
    description,
    specs,
    price,
    product_name,
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
  ]);

  // Submit Handler

  async function handleSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if (Object.values(validationErrors).length === 0) {
      let subSpecs = [...specs];
      for (let i = 3; i < subSpecs.length; i++) {
        if (!subSpecs[i]) {
          subSpecs.splice(i, 1);
          i--;
        }
      }

      let data = {
        user_id: user.id,
        brand,
        category_id,
        color,
        description,
        specs: "Product Specifications," + subSpecs.join(","),
        price,
        product_name,
        imageOne,
        imageTwo,
        imageThree,
        imageFour,
      };
      const newProductId = await dispatch(createNewProductThunk(data));
      _reset();
      closeModal();
      history.push(`/products/${newProductId}`);
    }
  }

  // Helper Functions

  function _checkForErrors() {
    const errors = {};
    if (!product_name) errors.product_name = "Name required";
    if (!brand) errors.brand = "Brand required";
    if (!color) errors.color = "Color required";
    if (!description || description.length < 50)
      errors.description = "Description of 50 characters required";
    if (!price || price < 0) errors.price = "A positive Price is required.";
    specs.forEach((spec) => {
      if (spec.includes(",")) errors.specs = "Specs cannot include commas";
    });
    if (!specs[0] || !specs[1] || !specs[2])
      errors.specs = "Product must have at least 3 specs";
    if (!imageOne || !urlCheck(imageOne))
      errors.imageOne = "Add at least 2 images ending in .png, .jpg, or .jpeg";
    if (!imageTwo || !urlCheck(imageTwo))
      errors.imageTwo = "Add at least 2 images ending in .png, .jpg, or .jpeg";
    if (imageThree) {
      if (!urlCheck(imageThree))
        errors.imageThree = "Must end with .png, .jpg, or .jpeg";
    }
    if (imageFour) {
      if (!urlCheck(imageFour))
        errors.imageFour = "Must end with .png, .jpg, or .jpeg";
    }
    setValidationErrors(errors);
  }

  function _reset() {
    setBrand("");
    setCategoryId("");
    setColor("");
    setDescription("");
    setSpecs([""]);
    setPrice("");
    setProductName("");
    setImageOne("");
    setImageTwo("");
    setImageThree("");
    setImageFour("");

    setValidationErrors({});
  }

  const urlCheck = (url) => {
    return (
      url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg")
    );
  };

  // Component

  return (
    <div id="product-form-container">
      <h3 id="product-form-h3">Add A New Product</h3>
      <form id="product-form" onSubmit={handleSubmit}>
        <div className="product-form-field-container">
          {validationErrors.product_name && hasSubmitted && (
            <p className="error-message">{validationErrors.product_name}</p>
          )}
          <div className="product-form-field">
            <label className="product-form-label">Product Name</label>
            <input
              className="product-form-input"
              type="text"
              placeholder="Product Name"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
        </div>
        <div className="product-form-field-container">
          {validationErrors.brand && hasSubmitted && (
            <p className="error-message">{validationErrors.brand}</p>
          )}
          <div className="product-form-field">
            <label className="product-form-label">Brand</label>
            <input
              className="product-form-input"
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
        </div>
        <div className="product-form-field-container">
          {validationErrors.category_id && hasSubmitted && (
            <p className="error-message">{validationErrors.category_id}</p>
          )}
          <div className="product-form-field">
            <label className="product-form-label">Category</label>
            <select
              id="category"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value={1}>Keyboard</option>
              <option value={2}>Mouse</option>
              <option value={3}>Gaming Mat</option>
              <option value={4}>Speaker</option>
              <option value={5}>Headphones</option>
            </select>
          </div>
        </div>
        <div className="product-form-field-container">
          {validationErrors.color && hasSubmitted && (
            <p className="error-message">{validationErrors.color}</p>
          )}
          <div className="product-form-field">
            <label className="product-form-label">Color</label>
            <input
              className="product-form-input"
              type="text"
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="product-form-field-container">
          {validationErrors.price && hasSubmitted && (
            <p className="error-message">{validationErrors.price}</p>
          )}
          <div className="product-form-field">
            <label className="product-form-label">Price</label>
            <input
              className="product-form-input"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="product-form-field-container-large">
          {validationErrors.description && hasSubmitted && (
            <p className="error-message">{validationErrors.description}</p>
          )}
          <div className="product-form-field-large">
            <label className="product-form-label-large">Description</label>
            <textarea
              id="form-text-area"
              placeholder="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
            />
          </div>
        </div>
        <div className="product-form-field-container-large">
          {validationErrors.specs && hasSubmitted && (
            <p className="error-message">{validationErrors.specs}</p>
          )}
          <label className="product-form-label-large">Specs</label>
          {specs?.map((str, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Specification field ${index + 1}`}
              value={specs[index]}
              onChange={(e) => {
                let newSpecs = [...specs];
                newSpecs[index] = e.target.value;
                setSpecs(newSpecs);
              }}
            />
          ))}
          <div className="product-button-container">
            {/* // ADD A SPEC */}
            {specs.length < 10 && (
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  const newSpecs = [...specs, ""];
                  setSpecs(newSpecs);
                }}
              >
                Add Spec
              </button>
            )}
          </div>
          <div className="product-button-container">
            {/* REMOVE A SPEC */}
            {specs.length > 3 && (
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  const newSpecs = [...specs];
                  newSpecs.pop();
                  setSpecs(newSpecs);
                }}
              >
                Remove Last Spec
              </button>
            )}
          </div>
        </div>
        <div className="product-form-field-container">
          {validationErrors.imageOne && hasSubmitted && (
            <p className="error-message">{validationErrors.imageOne}</p>
          )}
          <div className="product-form-field">
            <label className="product-form-label">Image One</label>
            <input
              className="product-form-input"
              type="text"
              placeholder="Image One"
              value={imageOne}
              onChange={(e) => setImageOne(e.target.value)}
            />
          </div>
        </div>
        <div className="product-form-field-container">
          {validationErrors.imageTwo && hasSubmitted && (
            <p className="error-message">{validationErrors.imageTwo}</p>
          )}
          <div className="product-form-field">
            <label className="product-form-label">Image Two</label>
            <input
              className="product-form-input"
              type="text"
              placeholder="Image Two"
              value={imageTwo}
              onChange={(e) => setImageTwo(e.target.value)}
            />
          </div>
        </div>
        <div className="product-form-field-container">
          {validationErrors.imageThree && hasSubmitted && (
            <p className="error-message">{validationErrors.imageThree}</p>
          )}
          <div className="product-form-field">
            <label className="product-form-label">Image Three</label>
            <input
              className="product-form-input"
              type="text"
              placeholder="Image Three"
              value={imageThree}
              onChange={(e) => setImageThree(e.target.value)}
            />
          </div>
        </div>
        <div className="product-form-field-container">
          {validationErrors.imageFour && hasSubmitted && (
            <p className="error-message">{validationErrors.imageFour}</p>
          )}
          <div className="product-form-field">
            <label className="product-form-label">Image Four</label>
            <input
              className="product-form-input"
              type="text"
              placeholder="Image Four"
              value={imageFour}
              onChange={(e) => setImageFour(e.target.value)}
            />
          </div>
        </div>
        <div className="product-button-container">
          <button type="button" className="button-small" onClick={handleSubmit}>
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
}
