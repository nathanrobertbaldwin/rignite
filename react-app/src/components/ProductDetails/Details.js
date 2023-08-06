import "./Details.css";

function Detail({ product }) {
  const specs = product.specs.split(",");
  const specsTitle = specs[0];
  const specsInfo = specs.slice(1);

  return (
    <div id="overview-specs-container">
      <div id="specs-list">
        <h2>{specsTitle}</h2>
        <ul>
          {specsInfo?.map((spec) => (
            <li id="individual-spec">{spec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Detail;
