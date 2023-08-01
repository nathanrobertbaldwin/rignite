import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewProductThunk } from "../../store/products";
import { useModal } from "../../context/Modal";
import "./AddProductModal.css";

export default function AddProductModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  // will want to ensure that user is logged and is an Admin
  const [brand, setBrand] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [specs, setSpecs] = useState("");
  const [price, setPrice] = useState("");
  const [product_name, setProductName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [imageFour, setImageFour] = useState("");
  const { closeModal } = useModal();

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
      let data = {
        brand,
        // Note: Give current category.
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
      };
      const newProduct = await dispatch(createNewProductThunk(data));
      _reset();
      closeModal();
      history.push(`/products/${newProduct.id}`);
    }
  }

  // Helper Functions

  function _checkForErrors() {
    const errors = {};
    // check for errors
    if (!brand) errors.brand = "Brand is required";
    if (!color) errors.color = "Color is required";
    if (!description) errors.description = "Description is required";
    if (description.length < 50 || description.length > 500)
      errors.description =
        "Description must be between 50 and 500 characters long";
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
    if (!urlCheck(imageTwo))
      errors.imageTwo = "Images must end with .png, .jpg, or .jpeg";
    if (!urlCheck(imageThree))
      errors.imageThree = "Images must end with .png, .jpg, or .jpeg";
    if (!urlCheck(imageFour))
      errors.imageFour = "Images must end with .png, .jpg, or .jpeg";
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
    <div id="new_product_form_container">
      <h1 id="new_product_form_h1">Create A New Product</h1>
      <form id="new_product_form" onSubmit={handleSubmit}>
        <div id="new_product_form_section">
          <h4 id="new_product_form_h4">Create a New Product</h4>
          <label>
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
            <input
              id="new_product_form_input"
              type="text"
              placeholder="Product Name"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
          <label>
            {validationErrors.brand && hasSubmitted ? (
              <p>
                {"Brand: "}
                <span className="error_message">{validationErrors.brand}</span>
              </p>
            ) : (
              "Brand"
            )}
            <input
              id="new_product_form_input"
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </label>
          <label>
            {validationErrors.category_id && hasSubmitted ? (
              <p>
                {"Category Id: "}
                <span className="error_message">
                  {validationErrors.category_id}
                </span>
              </p>
            ) : (
              "Category Id:"
            )}
            <input
              id="new_product_form_input"
              type="number"
              placeholder="Category Id"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </label>
          <label>
            {validationErrors.color && hasSubmitted ? (
              <p>
                {"Color: "}
                <span className="error_message">{validationErrors.color}</span>
              </p>
            ) : (
              "Color:"
            )}
            <input
              id="new_product_form_input"
              type="text"
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
          <label>
            <textarea
              id="new_product_product_description_field"
              placeholder="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
            />
            {validationErrors.description && hasSubmitted && (
              <span className="error_message">
                {validationErrors.description}
              </span>
            )}
          </label>
          <label>
            <textarea
              id="new_product_product_description_field"
              placeholder="Specs"
              type="text"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              rows="10"
            />
            {validationErrors.specs && hasSubmitted && (
              <span className="error_message">{validationErrors.specs}</span>
            )}
          </label>
          <label>
            {validationErrors.price && hasSubmitted ? (
              <p>
                {"Price: "}
                <span className="error_message">{validationErrors.price}</span>
              </p>
            ) : (
              "Price:"
            )}
            <input
              id="new_product_form_input"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            {validationErrors.imageOne && hasSubmitted ? (
              <p>
                {"Image One: "}
                <span className="error_message">
                  {validationErrors.imageOne}
                </span>
              </p>
            ) : (
              "Image One:"
            )}
            <input
              id="new_product_form_input"
              type="text"
              placeholder="Image One"
              value={imageOne}
              onChange={(e) => setImageOne(e.target.value)}
            />
          </label>
          <label>
            {validationErrors.imageTwo && hasSubmitted ? (
              <p>
                {"Image Two: "}
                <span className="error_message">
                  {validationErrors.imageOne}
                </span>
              </p>
            ) : (
              "Image Two:"
            )}
            <input
              id="new_product_form_input"
              type="text"
              placeholder="Image Two"
              value={imageTwo}
              onChange={(e) => setImageTwo(e.target.value)}
            />
          </label>
          <label>
            {validationErrors.imageThree && hasSubmitted ? (
              <p>
                {"Image Three: "}
                <span className="error_message">
                  {validationErrors.imageThree}
                </span>
              </p>
            ) : (
              "Image Three:"
            )}
            <input
              id="new_product_form_input"
              type="text"
              placeholder="Image Three"
              value={imageThree}
              onChange={(e) => setImageThree(e.target.value)}
            />
          </label>
          <label>
            {validationErrors.imageFour && hasSubmitted ? (
              <p>
                {"Image Four: "}
                <span className="error_message">
                  {validationErrors.imageFour}
                </span>
              </p>
            ) : (
              "Image Four:"
            )}
            <input
              id="new_product_form_input"
              type="text"
              placeholder="Image Four"
              value={imageFour}
              onChange={(e) => setImageFour(e.target.value)}
            />
          </label>
        </div>
        <div id="new_product_button_container">
          <button type="button" className="button_small" onClick={handleSubmit}>
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
}
