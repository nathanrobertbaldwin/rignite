import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductCategoriesThunk } from "../../store/categories";
import { getAllProductsThunk } from "../../store/products";
import { getAllOrdersThunk } from "../../store/orders";
import { getUserReviewsThunk } from "../../store/reviews";

import CategoryCard from "./CategoryCard";
import "./LandingPage.css";

export default function Landing() {
  const dispatch = useDispatch();
  const categoriesData = useSelector((store) => store.categories);
  const categories = Object.values(categoriesData);

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselPhotos = [
    {
      url: "https://massdrop-s3.imgix.net/hero-banner/gwtIIEo8QOaQXZdU5YIQ_2048_Dark_7299-copy-homepage-large.jpg",
      header: 'DROP + BIPP MT3 EXTENDED 2048 DARK',
      text: 'Our first-ever reverse dye-sublimated keycap set.'
    },
    {
      url: "https://massdrop-s3.imgix.net/hero-banner/z8My3qwkSWSVfE1fxQOQ_5733-copy-homepage-large.jpg",
      header: 'DROP ALT MECHANICAL KEYBOARD',
      text: 'Compact layout, classic design.'
    },
    {
      url: "https://massdrop-s3.imgix.net/hero-banner/ywlpl4qfTKehlM73DJkp_Art_Deco_0977-copy-homepage-large.jpg",
      header: 'DROP EXPRESSION SERIES MECHTROPOLIS',
      text: 'Art desco- with a dash of dystopia.'
    },
    {
      url: "https://massdrop-s3.imgix.net/hero-banner/gC0Ld3PTHyweVSKgWVjg_LOTR_Mordor_15-homepage-large.jpg",
      header: 'DROP + LORD OF THE RINGS MORDOR',
      text: 'Artisan keycaps from The Black Lands.'
    },
    {
      url: "https://massdrop-s3.imgix.net/hero-banner/YjBXZ7q7QrGGCMLp9xMs_SMSL_HO-150X_0896-copy-homepage-large.jpg",
      header: 'DROP + SMSL H01SX0 LINEAR AMPLIFIER',
      text: 'Compact. Powerful. Transparent.'
    },
    {
      url: "https://massdrop-s3.imgix.net/hero-banner/bEjlS0ADQSKseErLzxfR_15621-copy-homepage-large.jpg",
      header: 'DROP + SENNHEISER HD 6XX HEADPHONES',
      text: 'Class-leading open-back headphones.'
    }
  ]


  useEffect(() => {
    // MEGATHUNKADONK
    if (!Object.values(categoriesData).length) {
      async function fetchData() {
        await dispatch(getAllProductCategoriesThunk());
        await dispatch(getAllProductsThunk());
        await dispatch(getAllOrdersThunk());
        await dispatch(getUserReviewsThunk());
      }
      fetchData()

    }
  }, [dispatch]);



  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex < carouselPhotos.length - 1 ? prevIndex + 1 : 0));
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [carouselPhotos.length]);


  const cyclePhotos = () => {
    return (
      <ul className="carousel-ul">
        {carouselPhotos.map((photo, index) => (
          <>
            <li className={index === activeIndex ? 'active' : 'hidden'} key={index}>
              <img alt={index} src={photo.url} className="carouselphotostest" />
            </li>
          </>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div id="carousel-div-container">
        <div id="carousel-div">
          {cyclePhotos()}
        </div>
        <div id="text-move">
          <div id="carousel_cycle_text_container">
            <h2 className={'cycle-text'} >{carouselPhotos[activeIndex].header}</h2>
            <p className={'cycle-text'}>{carouselPhotos[activeIndex].text}</p>
          </div>
        </div>
        <h2 id='shop-by-category'>Shop by Category</h2>
      </div>
    {/* <div id="categories_index_container"> */}
      <div id='categories_index'>
        {categories?.map((category) => {
          return <CategoryCard key={category.id} category={category} />;
        })}
      </div>
    {/* </div> */}
    </>
  );
}
