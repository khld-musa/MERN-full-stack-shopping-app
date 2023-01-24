import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, col }) => {
  return (

    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item watches">
      <div class="block2">
        <div class="block2-pic hov-img0">
          <img src={product.images[0].url} alt="IMG-PRODUCT" />

          <a href="#">
            <Link
              to={`/product/${product._id}`}
              class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
            >
              Quick View
            </Link>
          </a>
        </div>

        <div class="block2-txt flex-w flex-t p-t-14">
          <div class="block2-txt-child1 flex-col-l ">
            <Link
              to={`/product/${product._id}`}
              class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
            >
              {product.name}
            </Link>

            <span class="stext-105 cl3">${product.price}</span>
          </div>

          <div class="block2-txt-child2 flex-r p-t-3">
            <a
              href="#"
              class="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
            >
              <div className="rating-outer dis-block trans-04">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
