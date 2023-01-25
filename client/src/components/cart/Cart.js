import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      <MetaData title={"Your Cart"} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>
          <div class="container">
            <div class="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
              <a href="/" class="stext-109 cl8 hov-cl1 trans-04">
                Home
                <i
                  class="fa fa-angle-right m-l-9 m-r-10"
                  aria-hidden="true"
                ></i>
              </a>

              <span class="stext-109 cl4">Shoping Cart</span>
            </div>
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <Fragment>
                  <table class="table-shopping-cart">
                    <tr class="table_head">
                      <th class="column-1">Product</th>
                      <th class="column-2"></th>
                      <th class="column-3">Price</th>
                      <th class="column-4">Quantity</th>
                      <th class="column-5">Quantity</th>
                    </tr>
                  </table>
                  <div className="cart-item" key={item.product}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>

                      <td class="column-4">
                        <div class="wrap-num-product flex-w m-l-auto m-r-0">
                          <div
                            class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            <i class="fs-16 zmdi zmdi-minus"></i>
                          </div>

                          <input
                            class="mtext-104 cl3 txt-center num-product  count"
                            type="number"
                            name="num-product2"
                            value={item.quantity}
                            readOnly
                          />

                          <div
                            class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            <i class="fs-16 zmdi zmdi-plus"></i>
                          </div>
                        </div>
                      </td>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button class="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer" onClick={checkoutHandler}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;