import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "flowbite-react";
import { FaHeart } from "react-icons/fa";

import { BiCheckboxSquare } from "react-icons/bi";
function MenuSlug() {
  const [menuData, setMenuData] = useState({});
  const [error, setError] = useState(null);

  const { menuSlug } = useParams();
  console.log("Menu Slug", menuSlug);

  useEffect(() => {
    try {
      const fetchMenu = async () => {
        const res = await fetch(`/api/menu/getMenu?slug=${menuSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
        } else {
          setMenuData(data.message.menu.menus[0]);
        }
      };

      fetchMenu();
      console.log("Menu Data", menuData);
    } catch (error) {
      setError(error.message);
    }
  }, [menuSlug]);

  const [isWishlist, setIsWishlist] = useState(false);

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };
  const discounted = 100 - menuData.menuDiscount;
  const price = (menuData.menuPrice * discounted) / 100;

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex flex-wrap items-center md:w-3/5  lg:w-4/5">
          <img
            alt="Menu Image"
            className="h-3/4 w-full rounded object-cover md:h-3/4 h lg:h-96 lg:w-1/2"
            src={menuData.menuImage}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">
              {menuData.menuCategory}
            </h2>
            <div className="flex items-center gap-6 my-auto">
              <h1 className="text-3xl font-semibold text-gray-800">
                {menuData.menuName}
              </h1>
              <FaHeart
                className={`h-6 w-6 cursor-pointer ${
                  isWishlist ? "text-red-500" : "text-gray-400"
                }`}
                onClick={toggleWishlist}
                title={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
              />
            </div>

            {/* TO DO RATING  */}
            <div className="my-4 flex items-center">
              <Rating>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
                <p className="ml-2 text-sm font-medium text-gray-500">
                  4.95 out of 5
                </p>
              </Rating>
            </div>
            <p className="leading-relaxed">{menuData.menuDescription}</p>
            <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
              <div className="flex items-center">
                {menuData.menuType === "veg" ? (
                  <span className="text-base font-semibold text-green-600 flex items-center">
                    Pure-Veg
                    <BiCheckboxSquare className=" mt-1 ml-1 h-6 w-6" />
                  </span>
                ) : (
                  <span className="text-base font-semibold text-red-600 flex items-center">
                    Non-Veg
                    <BiCheckboxSquare className=" mt-1 ml-1 h-6 w-6" />
                  </span>
                )}
              </div>
              <div className="ml-auto flex items-center">
                <div className="relative">
                  {menuData.menuStatus === "In Stock" ? (
                    <span className="text-base font-semibold text-gray-900">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-sm text-red-500">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-red-500">
                  {menuData.menuDiscount}% off
                </span>
                <span className="text-xl font-bold text-green-600">
                  ₹{menuData.discountPrice || price}
                </span>
                <span className="text-gray-500 line-through">
                  ₹{menuData.menuPrice}{" "}
                  {/* Original price with strikethrough */}
                </span>
              </div>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuSlug;
