import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import ListReviews from "../review/ListReviews";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Reivew posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, reviewError, match.params.id, success]);

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert.success("Item Added to Cart");
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", match.params.id);

    dispatch(newReview(formData));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <section class="sec-product-detail bg0 p-t-65 p-b-60">
            <div class="container">
              <div class="row">
                <div class="col-md-6 col-lg-7 p-b-30">
                  <div class="p-l-25 p-r-30 p-lr-0-lg">
                    <div class="wrap-slick3 flex-sb flex-w">
                      <div class="wrap-slick3-dots"></div>
                      <div class="wrap-slick3-arrows flex-sb-m flex-w"></div>

                      <div class="slick3 gallery-lb">
                        <div
                          class="item-slick3"
                          data-thumb="images/product-detail-01.jpg"
                        >
                          <div class="wrap-pic-w pos-relative">
                            {product.images &&
                              product.images.map((image) => (
                                <img
                                  className="d-block w-100"
                                  src={image.url}
                                  alt={product.title}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-lg-5 p-b-30">
                  <div class="p-r-50 p-t-5 p-lr-0-lg">
                    <h4 class="mtext-105 cl2 js-name-detail p-b-14">
                      {product.name}
                    </h4>

                    <span class="mtext-106 cl2">${product.price}</span>

                    <p class="stext-102 cl3 p-t-23">
                      Status:{" "}
                      <span
                        id="stock_status"
                        className={
                          product.stock > 0 ? "greenColor" : "redColor"
                        }
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                      <p>{product.stock} Items left</p>
                    </p>

                    <div class="p-t-33">
                      {/* <div class="flex-w flex-r-m p-b-10">
								<div class="size-203 flex-c-m respon6">
									Size
								</div>

								<div class="size-204 respon6-next">
									<div class="rs1-select2 bor8 bg0">
										<select class="js-select2" name="time">
											<option>Choose an option</option>
											<option>Size S</option>
											<option>Size M</option>
											<option>Size L</option>
											<option>Size XL</option>
										</select>
										<div class="dropDownSelect2"></div>
									</div>
								</div>
							</div> */}
                      {/* 
							<div class="flex-w flex-r-m p-b-10">
								<div class="size-203 flex-c-m respon6">
									Color
								</div>

								<div class="size-204 respon6-next">
									<div class="rs1-select2 bor8 bg0">
										<select class="js-select2" name="time">
											<option>Choose an option</option>
											<option>Red</option>
											<option>Blue</option>
											<option>White</option>
											<option>Grey</option>
										</select>
										<div class="dropDownSelect2"></div>
									</div>
								</div>
							</div> */}

                      <div class="flex-w flex-r-m p-b-10">
                        <div class="size-204 flex-w flex-m respon6-next">
                          <div class="wrap-num-product flex-w m-r-20 m-tb-10">
                            <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                              <i
                                class="btn fs-16 zmdi zmdi-minus"
                                onClick={decreaseQty}
                              ></i>
                            </div>

                            <input
                              class="mtext-104 cl3 txt-center num-product count"
                              type="number"
                              name="num-product"
                              value={quantity}
                              readOnly
                            />

                            <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                              <i
                                class="btn fs-16 zmdi zmdi-plus"
                                onClick={increaseQty}
                              ></i>
                            </div>
                          </div>

                          <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                                       type="button"
                                       disabled={product.stock === 0}
                                       onClick={addToCart}
                                       >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>

                    <div class="flex-w flex-m p-l-100 p-t-40 respon7">
                      <div class="flex-m bor9 p-r-10 m-r-11">
                        <a
                          href="#"
                          class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                          data-tooltip="Add to Wishlist"
                        >
                          <i class="zmdi zmdi-favorite"></i>
                        </a>
                      </div>

                      <a
                        href="#"
                        class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                        data-tooltip="Facebook"
                      >
                        <i class="fa fa-facebook"></i>
                      </a>

                      <a
                        href="#"
                        class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                        data-tooltip="Twitter"
                      >
                        <i class="fa fa-twitter"></i>
                      </a>

                      <a
                        href="#"
                        class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                        data-tooltip="Google Plus"
                      >
                        <i class="fa fa-google-plus"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bor10 m-t-50 p-t-43 p-b-40">
                <div class="tab01">
                  <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item p-b-10">
                      <a
                        class="nav-link active"
                        data-toggle="tab"
                        href="#description"
                        role="tab"
                      >
                        Description
                      </a>
                    </li>

                    <li class="nav-item p-b-10">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#information"
                        role="tab"
                      >
                        Additional information
                      </a>
                    </li>

                    <li class="nav-item p-b-10">
                      <a
                        class="nav-link"
                        data-toggle="tab"
                        href="#reviews"
                        role="tab"
                        onClick={setUserRatings}
                      >
                        Reviews ({product.numOfReviews})
                      </a>
                    </li>
                  </ul>

                  <div class="tab-content p-t-43">
                    <div
                      class="tab-pane fade show active"
                      id="description"
                      role="tabpanel"
                    >
                      <div class="how-pos2 p-lr-15-md">
                        <p class="stext-102 cl6">{product.description}</p>
                      </div>
                    </div>

                    <div class="tab-pane fade" id="information" role="tabpanel">
                      <div class="row">
                        <div class="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                          <ul class="p-lr-28 p-lr-15-sm">
                            <li class="flex-w flex-t p-b-7">
                              <span class="stext-102 cl6 size-206">
                                <p id="product_seller mb-3">
                                  Sold by: <strong>{product.seller}</strong>
                                </p>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="tab-pane fade" id="reviews" role="tabpanel">
                      <div class="row">
                        <div class="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                          <div class="p-b-30 m-lr-15-sm">
                            <div class="flex-w flex-t p-b-68">
                              <div class="size-207">
                                {product.reviews &&
                                  product.reviews.length > 0 && (
                                    <ListReviews reviews={product.reviews} />
                                  )}
                              </div>
                            </div>

                            <form class="w-full">
                              <h5 class="mtext-108 cl2 p-b-7">Add a review</h5>

                              <div class="flex-w flex-m p-t-50 p-b-23">
                                <span class="stext-102 cl3 m-r-16">
                                  Your Rating
                                </span>

                                <ul className="stars">
                                  <li className="star">
                                    <i className="fa fa-star"></i>
                                  </li>
                                  <li className="star">
                                    <i className="fa fa-star"></i>
                                  </li>
                                  <li className="star">
                                    <i className="fa fa-star"></i>
                                  </li>
                                  <li className="star">
                                    <i className="fa fa-star"></i>
                                  </li>
                                  <li className="star">
                                    <i className="fa fa-star"></i>
                                  </li>
                                </ul>
                              </div>

                              <div class="row p-b-25">
                                <div class="col-12 p-b-5">
                                  <label class="stext-102 cl3" for="review">
                                    Your review
                                  </label>
                                  <textarea
                                    class="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                                    id="review"
                                    name="review"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  ></textarea>
                                </div>
                              </div>
                              {user ? (
                                <button
                                  class="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10"
                                  type="button"
                                  data-toggle="modal"
                                  data-target="#ratingModal"
                                  onClick={reviewHandler}
                                >
                                  Submit
                                </button>
                              ) : (
                                <div
                                  className="alert alert-danger mt-5"
                                  type="alert"
                                >
                                  Login to post your review.
                                </div>
                              )}
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
              <span class="stext-107 cl6 p-lr-25">SKU: JAK-01</span>

              <span class="stext-107 cl6 p-lr-25">Categories: Jacket, Men</span>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
