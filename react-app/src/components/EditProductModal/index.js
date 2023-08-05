import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProductThunk } from "../../store/products";
import { useModal } from "../../context/Modal";

export default function EditProductModal({ product }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const [brand, setBrand] = useState(product.brand);
  const [category_id, setCategoryId] = useState(product.category_id);
  const [color, setColor] = useState(product.color);
  const [description, setDescription] = useState(product.description);
  const [specs, setSpecs] = useState(product.specs);
  const [price, setPrice] = useState(product.price);
  const [product_name, setProductName] = useState(product.product_name);
  const [status, setStatus] = useState(product.status);

  const [imageOne, setImageOne] = useState(
    product.product_photos[0] ? product.product_photos[0].url : ""
  );
  const [imageTwo, setImageTwo] = useState(
    product.product_photos[1] ? product.product_photos[1].url : ""
  );
  const [imageThree, setImageThree] = useState(
    product.product_photos[2] ? product.product_photos[2].url : ""
  );
  const [imageFour, setImageFour] = useState(
    product.product_photos[3] ? product.product_photos[3].url : ""
  );

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
    status,
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
  ]);

  // Submit Handler

  async function handleSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);
    console.log("After submit, validation errors:", validationErrors);

    if (Object.values(validationErrors).length === 0) {
      let data = {
        product_id: product.id,
        user_id: user.id,
        brand,
        category_id,
        color,
        description,
        specs,
        price,
        product_name,
        status,
        imageOne,
        imageTwo,
        imageThree,
        imageFour,
      };
      const editedProductId = await dispatch(editProductThunk(data));
      _reset();
      closeModal();
      history.push(`/products/${editedProductId}`);
    }
  }

  // Helper Functions

  function _checkForErrors() {
    const errors = {};
    // check for errors
    if (!product_name) errors.product_name = "Name required";
    if (!brand) errors.brand = "Brand required";
    if (!color) errors.color = "Color required";
    if (!description || description.length < 50)
      errors.description = "Description of 50 characters required";
    if (!price || price < 0) errors.price = "A positive Price is required.";
    if (!specs) errors.specs = "Product must have specs";
    if (specs.length < 30)
      errors.spec = "Specs must be more than 50 characters";
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
    console.log("Validation Errors:", validationErrors);
  }

  function _reset() {
    setBrand("");
    setCategoryId("");
    setColor("");
    setDescription("");
    setSpecs("");
    setPrice("");
    setProductName("");
    setStatus("");
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
            <input
              className="product-form-input"
              type="number"
              placeholder="Category Id"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
            />
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
        <div className="product-form-field-container">
          <div className="product-form-field-large">
            {validationErrors.specs && hasSubmitted && (
              <p className="error-message">{validationErrors.specs}</p>
            )}
            <label className="product-form-label-large">Specs</label>
            <textarea
              id="form-text-area"
              placeholder="Specs"
              type="text"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              rows="10"
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
        <div className="product-form-field-container">
          {validationErrors.status && hasSubmitted && (
            <p className="error-message">{validationErrors.status}</p>
          )}
          <div className="product-form-field">
            <label className="product-form-label">Status</label>
            <select
              id="state"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select a Status</option>
              <option value="active">Active</option>
              <option value="sold out">Sold Out</option>
              <option value="deactivated">Deactivated</option>
            </select>
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
        <div id="product-button-container">
          <button type="button" className="button-small" onClick={handleSubmit}>
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
}
