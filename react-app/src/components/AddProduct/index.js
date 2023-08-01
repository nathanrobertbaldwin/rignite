import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewProductThunk } from "../../store/products";
import "./AddProduct.css";

export default function AddProduct() {

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  // will want to ensure that user is logged and is an Admin
  const [brand, setBrand] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [color, setColor] = useState("")
  const [description, setDescription] = useState("")
  const [specs, setSpecs] = useState("")
  const [price, setPrice] = useState("")
  const [product_name, setProductName] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

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
    product_name
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
        product_name
      };
      const newProduct = await dispatch(createNewProductThunk(data))
      // const newProductPhotos = await dispatch(need this Thunk)
      _reset();
      history.push(`/products/${newProduct.id}`);
    }
  }

  // Helper Functions

  function _checkForErrors() {
    const errors = {};
    // check for errors
    if(!brand) errors.brand = "Brand is required"
    if(!color) errors.color = "Color is required"
    if(!description) errors.description = "Description is required"
    if(description.length < 50 || description.length > 500) errors.description = "Description must be between 50 and 500 characters long"
    if(!price) errors.price = "Price is required"
    if(price < 0) errors.price = "Price must be positive"
    if(!product_name) errors.product_name = "Product must have a name"
    if(product_name.length < 5) errors.product_name = "Product name must be more than 5 characters long"
    if(!specs) errors.specs = "Product must have specs"
    if(specs.length < 30) errors.spec = "Product specs must contain more than 50 characters"
    setValidationErrors(errors);
  }

  function _reset() {
    setBrand("");
    setCategoryId("");
    setColor("");
    setDescription("");
    setSpecs("")
    setPrice("");
    setProductName("");

    setValidationErrors({});
  }

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
                <span className="error_message">
                  {validationErrors.brand}
                </span>
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
                <span className="error_message">
                  {validationErrors.color}
                </span>
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
              <span className="error_message">
                {validationErrors.specs}
              </span>
            )}
          </label>
          <label>
            {validationErrors.price && hasSubmitted ? (
              <p>
                {"Price: "}
                <span className="error_message">
                  {validationErrors.price}
                </span>
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
        </div>
        <div id="new_product_button_container">
          <button type="submit" className="button_small">
            Create product
          </button>
        </div>
      </form>
    </div>
  );
}
