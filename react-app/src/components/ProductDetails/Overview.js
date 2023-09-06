import "./Overview.css";

function Overview({ product }) {
  const product_photos = product.product_photos;

  return (
    <div id="overview-container">
      <h3>{product.product_name}</h3>
      <span id="overview-description">{product.description}</span>
      <div id="overview_images_container">
        {product_photos?.map((photo) => (
          <img
            alt="product"
            className="overview-other-images"
            src={photo.url}
          />
        ))}
      </div>
    </div>
  );
}

export default Overview;
