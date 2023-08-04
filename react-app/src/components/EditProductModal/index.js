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
  // will want to ensure that user is logged and is an Admin

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

    if (Object.values(validationErrors).length === 0) {
      let data = {
        product_id: product.id,
        user_id: user.id,
        brand,
        // Note: Give current category.
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
    if (!brand) errors.brand = "Brand is required";
    if (!color) errors.color = "Color is required";
    if (!description) errors.description = "Description is required";
    if (description.length < 50)
      errors.description = "Description must be greater than 50 characters.";
    if (!price) errors.price = "Price is required";
    if (price < 0) errors.price = "Price must be positive";
    if (!product_name) errors.product_name = "Product must have a name";
    if (product_name.length < 5)
      errors.product_name = "Product name must be more than 5 characters long";
    if (!specs) errors.specs = "Product must have specs";
    if (specs.length < 30)
      errors.spec = "Product specs must contain more than 50 characters";
    if (!imageOne) errors.imageOne = "You must have at least 1 image";
    if (!urlCheck(imageOne))
      errors.imageOne = "Images must end with .png, .jpg, or .jpeg";
    if (imageTwo) {
      if (!urlCheck(imageTwo))
        errors.imageTwo = "Images must end with .png, .jpg, or .jpeg";
    }
    if (imageThree) {
      if (!urlCheck(imageThree))
        errors.imageThree = "Images must end with .png, .jpg, or .jpeg";
    }
    if (imageFour) {
      if (!urlCheck(imageFour))
        errors.imageFour = "Images must end with .png, .jpg, or .jpeg";
    }
    setValidationErrors(errors);
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
      <h3 id="product-form-h3">Edit This Product</h3>
      <form id="product-form" onSubmit={handleSubmit}>
        <div className="product-form-field">
          <label className="product-form-label">
            {validationErrors.product_name && hasSubmitted ? (
              <p>
                {"Product Name: "}
                <span className="error_message">
                  {validationErrors.product_name}
                </span>
              </p>
            ) : (
              "Product Name:"
            )}
          </label>
          <input
            className="product-form-input"
            type="text"
            placeholder="Product Name"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="product-form-field">
          <label className="product-form-label">
            {validationErrors.brand && hasSubmitted ? (
              <p>
                {"Brand: "}
                <span className="error-message">{validationErrors.brand}</span>
              </p>
            ) : (
              "Brand:"
            )}
          </label>
          <input
            className="product-form-input"
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="product-form-field">
          <label className="product-form-label">
            {validationErrors.category_id && hasSubmitted ? (
              <p>
                {"Category Id: "}
                <span className="error-message">
                  {validationErrors.category_id}
                </span>
              </p>
            ) : (
              "Category Id:"
            )}
          </label>
          <input
            className="product-form-input"
            type="number"
            placeholder="Category Id"
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </div>
        <div className="product-form-field">
          <label className="product-form-label">
            {validationErrors.color && hasSubmitted ? (
              <p>
                {"Color: "}
                <span className="error-message">{validationErrors.color}</span>
              </p>
            ) : (
              "Color:"
            )}
          </label>
          <input
            className="product-form-input"
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <label>
          {validationErrors.description && hasSubmitted ? (
            <p>
              {"Description: "}
              <span className="error_message">
                {validationErrors.description}
              </span>
            </p>
          ) : (
            "Description:"
          )}
        </label>
        <textarea
          id="form-text-area"
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="6"
        />
        <label>
          {validationErrors.specs && hasSubmitted ? (
            <p>
              {"Specs: "}
              <span className="error-message">{validationErrors.specs}</span>
            </p>
          ) : (
            "Specs:"
          )}
        </label>
        <textarea
          id="form-text-area"
          placeholder="Specs"
          type="text"
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          rows="10"
        />
        <div className="product-form-field">
          <label className="product-form-label">
            {validationErrors.price && hasSubmitted ? (
              <p>
                {"Price: "}
                <span className="error-message">{validationErrors.price}</span>
              </p>
            ) : (
              "Price:"
            )}
          </label>
          <input
            className="product-form-input"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="product-form-field">
          <label className="product-form-label">Status:</label>
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
        <div className="product-form-field">
          <label className="product-form-label">
            {validationErrors.imageOne && hasSubmitted ? (
              <p>
                {"Image One: "}
                <span className="error-message">
                  {validationErrors.imageOne}
                </span>
              </p>
            ) : (
              "Image One:"
            )}
          </label>
          <input
            className="product-form-input"
            type="text"
            placeholder="Image One"
            value={imageOne}
            onChange={(e) => setImageOne(e.target.value)}
          />
        </div>
        <div className="product-form-field">
          <label className="product-form-label">
            {validationErrors.imageTwo && hasSubmitted ? (
              <p>
                {"Image Two: "}
                <span className="error-message">
                  {validationErrors.imageOne}
                </span>
              </p>
            ) : (
              "Image Two:"
            )}
          </label>
          <input
            className="product-form-input"
            type="text"
            placeholder="Image Two"
            value={imageTwo}
            onChange={(e) => setImageTwo(e.target.value)}
          />
        </div>
        <div className="product-form-field">
          <label className="product-form-label">
            {validationErrors.imageThree && hasSubmitted ? (
              <p>
                {"Image Three: "}
                <span className="error-message">
                  {validationErrors.imageThree}
                </span>
              </p>
            ) : (
              "Image Three:"
            )}
          </label>
          <input
            className="product-form-input"
            type="text"
            placeholder="Image Three"
            value={imageThree}
            onChange={(e) => setImageThree(e.target.value)}
          />
        </div>
        <div className="product-form-field">
          <label className="product-form-label">
            {validationErrors.imageFour && hasSubmitted ? (
              <p>
                {"Image Four: "}
                <span className="error-message">
                  {validationErrors.imageFour}
                </span>
              </p>
            ) : (
              "Image Four:"
            )}
          </label>
          <input
            className="product-form-input"
            type="text"
            placeholder="Image Four"
            value={imageFour}
            onChange={(e) => setImageFour(e.target.value)}
          />
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
