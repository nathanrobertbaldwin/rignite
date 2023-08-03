import './Overview.css'

function Overview({product}) {
    const product_photos = product.product_photos
    const primaryPhoto = product_photos[0]
    const secondaryPhoto = product_photos[1]
    const otherPhotos = product_photos.slice(2);

    return (
        <div id='overview-container'>
            <div id='overview-description-container'>
                <h2 className='overview-product-name'>{product.product_name}</h2>
                <p className='overview-description'>{product.description}</p>
            </div>
            <div id="overview-primary-image">
                <img
                alt="product"
                src={primaryPhoto.url}
                />
            </div>
            <div id='overview-description-container'>
                <h2 className='overview-product-name'>{product.product_name}</h2>
                <p className='overview-description'>{product.description}</p>
            </div>
            <div>
            <img
                alt="product"
                id="overview-secondary-image"
                src={secondaryPhoto?.url}
                />
            </div>
            <div id='other-photos-container'>
            {otherPhotos?.map((photo) => (
                <img
                alt="product"
                id="overview-other-images"
                src={photo.url}
                />
            ))}
            </div>
        </div>
    )
}

export default Overview
