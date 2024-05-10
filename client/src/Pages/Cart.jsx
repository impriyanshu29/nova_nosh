import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiCheckboxSquare } from "react-icons/bi";
import {
  removeFromCartSuccess,
  addToCartFail,
  addToCartSuccess,
  removeFromCartFail,
} from "../Redux/Cart-slice/cartSlice";
function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const cartProduct = cart?.status?.cartData?.menus?.map((m) => m.menu);
  const menuSlug = location.pathname.split("/")[2];
  const [success, setSuccess] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const fetchProducts = async () => {
    try {
      const allMenu = cartProduct.map((id) => {
        return fetch(`/api/menu/getMenu?_id=${id}`).then((res) => {
          if (!res.ok) {
            setError("Failed to fetch products");
          }
          return res.json();
        });
      });

      const data = await Promise.all(allMenu);
      console.log("Data", data);
      setProducts(data);
    } catch (error) {
      setError("Failed to fetch products");
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

  useEffect(() => {
    try {
      const fetchCart = async () => {
        const res = await fetch(
          `/api/cart/getCart/${currentUser?.message?.user?._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          dispatch(addToCartSuccess(data));
        } else {
          dispatch(addToCartFail(data.message));
        }
      };
      fetchCart();
    } catch (error) {
      setError("Error while fetching cart");
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  }, [cart?.status?.cartData?.menus.totalQuantity]);

  useEffect(() => {
    fetchProducts();
  }, [cart?.status?.cartData?.menus]);

  const pro = products.map((p) => p.message.menu.menus);
  const totalMoney = pro.flat().reduce((acc, item) => {
    const menuInCart = cart?.status?.cartData?.menus?.find(
      (m) => m.menu === item._id
    );
    const quantity = menuInCart?.quantity;
    return acc + item.menuPrice * quantity;
  }, 0);
  const totalDiscount = pro.flat().reduce((acc, item) => {
  const menuInCart = cart?.status?.cartData?.menus?.find(
      (m) => m.menu === item._id
    );
    const quantity = menuInCart?.quantity;
    return acc + item.discountPrice * quantity;
  }, 0);
  const discount = totalMoney - totalDiscount;
  const finalMoney = totalDiscount + (totalMoney > 200 ? 0 : 50);

  // to remove product from cart
  const handleRemove = async (id) => {
    try {
      const res = await fetch(
        `/api/cart/remove/${currentUser?.message?.user?._id}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(removeFromCartSuccess(data));
        setSuccess("Product removed from cart");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        dispatch(removeFromCartFail(data));
        setError("Failed to remove product");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      setError("Failed to remove product");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  // to increase quantity of product
  const handleIncrement = async (id) => {
    try {
      const res = await fetch(
        `/api/cart/increment/${currentUser?.message?.user?._id}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(addToCartSuccess(data));
        setSuccess("Product quantity increased");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        dispatch(addToCartFail(data));
        setError("Failed to increase quantity");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      setError("Failed to increase quantity");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleDecrement = async (id) => {
    try {
      const res = await fetch(
        `/api/cart/decrement/${currentUser?.message?.user?._id}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(addToCartSuccess(data));
        setSuccess("Product quantity decreased");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        dispatch(addToCartFail(data));
        setError("Failed to decrease quantity");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      setError("Failed to decrease quantity");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  const isCartEmpty = cart?.status?.cartData?.menus?.length === 0;

  return (
    <>
      {isCartEmpty ? (
        <div className="mx-auto max-w-7xl px-5 bg-white lg:px-0">
          <div className="mx-auto max-w-xl md:max-w-2xl py-8 px-6 md:px-2 lg:max-w-3xl">
            <h1 className="text-3xl  text-center font-serif tracking-tight text-gray-900 md:text-5xl">
              Shopping Cart
            </h1>
            <div className="flex justify-center items-center mt-12">
              <div className="flex flex-col items-center">
                <div>
                <img
                  src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                  alt="empty cart"
                  className="h-52 w-52"
                />
                </div>
                <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Your cart is empty
                </h2>
                </div>
                <div className=" ">
                <p className="text-gray-500 text-center mt-2 mb-6">
                  {" "}
                  
                  Looks like you haven't added any items to the cart yet
                </p>
                </div>
                <Link
                  to="/menu"
                  className="block px-3 py-3 bg-black text-white font-semibold text-sm text-center mt-5 rounded-md shadow-sm hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-5 bg-zinc-50 lg:px-0">
          <div className="mx-auto max-w-xl md:max-w-2xl py-8 px-6 md:px-2 lg:max-w-3xl">
            <h1 className="text-3xl  text-center font-serif tracking-tight text-gray-900 md:text-5xl">
              Shopping Cart
            </h1>
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-zinc-50 lg:col-span-8"
              >
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <ul role="list" className="divide-y divide-gray-200">
                  {pro.flat().map((product) => (
                    <div key={product._id} className="">
                      <li className="flex py-6 sm:py-6 ">
                        <div className="flex-shrink-0">
                          <img
                            src={product.menuImage}
                            alt={product.menuName}
                            className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <Link
                                    to={`/menu/${product.slug}`}
                                    className="font-semibold text-black"
                                  >
                                    {product.menuName}
                                  </Link>
                                </h3>
                              </div>
                              <div className="mt-1 flex text-sm">
                                <div className="flex items-center">
                                  {product.menuType === "veg" ? (
                                    <span className="text-sm font-semibold text-green-600 flex items-center">
                                      Pure-Veg
                                      <BiCheckboxSquare className=" mt-1 ml-1 h-6 w-6" />
                                    </span>
                                  ) : (
                                    <span className="text-sm font-semibold text-red-600 flex items-center">
                                      Non-Veg
                                      <BiCheckboxSquare className=" mt-1 ml-1 h-6 w-6" />
                                    </span>
                                  )}
                                  {product.menuCategory ? (
                                    <p className="ml-4 border-l border-gray-200 pl-4  text-sm text-gray-500">
                                      {product.menuCategory}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                              <div className="mt-2 flex items-end">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-red-500">
                                    {product.menuDiscount}% off
                                  </span>
                                  <span className=" font-bold text-base text-green-600">
                                    ₹{product.discountPrice}
                                  </span>
                                  <span className="text-gray-500 text-base line-through">
                                    ₹{product.menuPrice}{" "}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-auto flex items-center">
                                <div className="relative mt-1">
                                  {product.menuStatus === "In Stock" ? (
                                    <span className="text-sm   text-gray-900">
                                      In Stock
                                    </span>
                                  ) : (
                                    <span className="text-sm text-red-500">
                                      Out of Stock
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <div className="mb-2 flex">
                        <div className="min-w-24 flex">
                          <button
                            type="button"
                            className="h-7 w-7"
                            onClick={() => {
                              handleDecrement(product._id);
                            }}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="mx-1 h-7 w-9 rounded-md border text-center"
                            defaultValue={1}
                            value={
                              cart?.status?.cartData?.menus?.find(
                                (m) => m.menu === product._id
                              )?.quantity || 0
                            }
                          />
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center"
                            onClick={() => {
                              handleIncrement(product._id);
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div className="ml-6 flex text-sm">
                          <button
                            type="button"
                            className="flex items-center space-x-1 px-2 py-1 pl-0"
                            onClick={() => {
                              handleRemove(product._id);
                            }}
                          >
                            {/* <Trash size={12} className="text-red-500" /> */}
                            <span className="text-xs font-medium text-red-500">
                              Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </section>

              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-md bg-zinc-50 px-3 lg:col-span-4 lg:mt-0 lg:p-0"
              >
                <h2
                  id="summary-heading"
                  className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                >
                  Price Details
                </h2>
                <div>
                  <dl className=" space-y-1 px-3 py-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">
                        Price of {cart?.status?.cartData?.totalQuantity} items
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ₹ {totalMoney}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <dt className="flex items-center text-sm text-gray-800">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        ₹ {discount}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-gray-800">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        {" "}
                        {totalMoney > 200 ? "Free" : "₹50"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-gray-900">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹ {finalMoney}
                      </dd>
                    </div>
                  </dl>
                  <div className="px-2 pb-4 font-medium text-green-700">
                    You will save ₹{discount} on this order
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block px-3 py-3 bg-black text-white font-semibold text-sm text-center mt-5 rounded-md shadow-sm hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Proceed to Checkout
                </Link>
              </section>
            </form>
            {error && (
              <div className="mt-4 bg-red-100 border border-red-400 text-center text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 bg-green-100 border border-green-400 text-center text-green-700 px-4 py-3 rounded relative">
                {success}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
