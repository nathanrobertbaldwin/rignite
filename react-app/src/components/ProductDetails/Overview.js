import "./Overview.css";

function Overview({ product }) {
  const product_photos = product.product_photos;

  return (
    <div id="overview-container">
      <h3>{product.product_name}</h3>
      <div id="overview-wrapper">
        <span id="overview-description">{product.description}</span>
        <div id="overview-images-container">
          {product_photos?.map((photo) => (
            <img alt="product" className="overview-images" src={photo.url} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
