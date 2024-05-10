import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import {
  removeFromCartSuccess,
  addToCartFail,
  addToCartSuccess,
  removeFromCartFail,
} from "../Redux/Cart-slice/cartSlice";
import { BiCheckboxSquare } from "react-icons/bi";
import {
  addAddressFail,
  addAddressStart,
  addAddressSuccess,
} from "../Redux/User-Slice/addressSlice";
import {
  updateFail,
  updateSuccess,
  clearError,
} from "../Redux/User-Slice/userSlice";
import { Link, useLocation } from "react-router-dom";
function Checkout() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [error, setError] = useState(null);
  const cartProduct = cart?.status?.cartData?.menus?.map((m) => m.menu);
  const [success, setSuccess] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { currentAddress } = useSelector((state) => state.address);

  const location = useLocation();
  // Fetching all the items in cart for the user
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
  }, [
    cart?.status?.cartData?.menus.totalQuantity,
    currentUser?.message?.user?._id,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentAddress === null) {
          const refreshRes = await fetch(`/api/auth/refreshToken`, {
            method: "GET",
            credentials: "include",
          });

          const dataRefresh = await refreshRes.json();
          if (!refreshRes.ok) {
            dispatch(updateFail(dataRefresh.error));
            setUpdateMessage("Please clear cookies and sign in again");
            setTimeout(() => {
              setUpdateMessage(null);
              dispatch(clearError());
            }, 4000);
            return;
          }

          dispatch(updateSuccess(dataRefresh));
          const userId = currentUser?.message?.user?._id;
          dispatch(addAddressStart());
          const res = await fetch(`/api/add/getAddress?userId=${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (res.ok) {
            dispatch(addAddressSuccess(data));
          } else {
            dispatch(addAddressFail(data.message));
          }
        }
      } catch (error) {
        dispatch(addAddressFail(error.message));
        setTimeout(() => {
          dispatch(clearError());
        }, 4000);
      }
    };

    fetchData();
  }, [currentUser?.message?.user?._id, currentAddress?.status.address[0]]);

  // Fetching all products
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
    fetchProducts();
  }, [cart?.status?.cartData?.menus, currentUser?.message?.user?._id]);

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

  const address = currentAddress?.status?.address;

  return (
    <section className=" bg-zinc-50 pb-6 md:py-8  body-font">
      <div className="md:py-10 py-6  ">
        <p className="text-center font-serif  text-3xl text-gray-900  md:text-5xl md:leading-10">
          Checkout
        </p>
      </div>
      <div className="mx-auto bg-zinc-50  max-w-4xl ">
        <div className="overflow-hidden  rounded-xl  shadow-xl ">
          <div className="grid grid-cols-1  md:grid-cols-2">
            {/* Contact Info */}
            {currentAddress === null ? (
              <div className="px-6 py-8 my-auto text-gray-900 md:px-10 ">
                <div className="flow-roo ">
                  <div className="py-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      No Saved Address
                    </h2>

                    <p className="mt-4 text-sm text-gray-800">
                      You don't have any saved address. Please add an address to
                      continue.
                    </p>

                    <Link to="/account?pro=address">
                      <button className="mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-[#E52A3D] transition">
                        <FaPlus className="inline-block mr-2" />
                        Add New Address
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-1  py-6 text-gray-900 md:px-8">
                <div className="flow-root">
                  <div className="-my-6 divide-y divide-gray-200">
                    <div className="py-6">
                      <div className=" text-gray-800  p-6 ">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">
                              Deliver to :
                            </h3>
                          </div>
                          <div>
                            <Link to="/account?pro=address">
                              <button className="rounded-full   hover:bg-[#E52A3D] transition">
                                <FaPen className="inline-block mr-2" />
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="font-semibold mt-2">
                            {address?.fullName}
                          </p>

                          <p className="mt-1 flex ">
                            {address?.houseNo}, {address?.area},{" "}
                            {address?.district} - {address?.pin_code},{" "}
                            {address?.state}
                          </p>
                          <p className="mt-1 ">Phone: {address?.phoneNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product List */}
            <div className="bg-zinc-100 px-5 rounded-t-xl md:rounded-xl md:px-8">
              <div className="flow-root">
                <ul className="-my-7 divide-y py-4 divide-gray-200">
                  {pro.flat().map((product) => (
                    <li
                      key={product.id}
                      className="flex items-stretch justify-between space-x-5 py-7"
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20  object-contain"
                            src={product.menuImage}
                            alt={product.menuName}
                          />
                        </div>
                        <div className="ml-5 flex flex-col justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-bold">
                              {product.menuName}
                            </p>
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
                              </div>
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
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end justify-between">
                        {product.menuCategory ? (
                          <p className="ml-4 border-l border-gray-200 pl-4  text-sm text-gray-500">
                            {product.menuCategory}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="mt-6 border-gray-200" />
              <form action="#" className="mt-6">
                <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                  <div className="flex-grow">
                    <input
                      className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter coupon code"
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                    <button
                      type="button"
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
              </form>
              <ul className="mt-6 space-y-3">
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
                      - ₹ {discount}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">
                      {" "}
                      {totalMoney > 200 ? (
                        <p>
                          {" "}
                          <span className="text-gray-500 text-sm line-through">
                            ₹ 50
                          </span>{" "}
                          FREE Delivery{" "}
                        </p>
                      ) : (
                        "₹50"
                      )}
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
              </ul>

              <div
                className="font-bold md:block bottom-0 w-full 
           hidden"
              >
                <div className="flex justify-between p-4 bg-transparent">
                  <div className=" pt-2 font-medium text-green-700">
                    You will save ₹{discount} on this order
                  </div>
                  <div className="flex flex-col items-end">
                    <button className="rounded-md bg-[#E52A3D] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="font-bold fixed bottom-0 w-full 
           md:hidden"
          >
            <div className="flex justify-between p-4 bg-zinc-50 rounded-t-xl shadow-xl">
              <div className=" flex items-center ">
                <div className="flex items-center space-x-2">
                  <span className=" font-semibold text-base text-green-600">
                    ₹ {finalMoney}
                  </span>
                  <span className="text-gray-500 text-base font-normal line-through">
                    ₹ {totalMoney}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <button className="rounded-md bg-[#E52A3D] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
