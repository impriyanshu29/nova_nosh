import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { updateFail, updateSuccess, clearError, } from '../../../Redux/User-Slice/userSlice';
import { useSelector, useDispatch } from "react-redux";

function WhistList() {
  const [menus, setMenus] = useState([]);
  const [fullMenu, setFullMenu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   try {
  //     const urlParams =new URLSearchParams(location.search);

  //     urlParams.set('searchTerm', searchValue)

  //     const search = urlParams.toString()
  //     navigate(`/search?${search}`)
  //   } catch (error) {
  //     console.log("Error fetching search:", error);
  //   }
  // }

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await fetch(
        `/api/whistList/getWhistList/${currentUser?.message?.user?._id}`
      );
      const data = await res.json();
      if (res.ok) {
        setMenus(data.message.menus);
        setFullMenu(data.message.menu);
      }
    };
    fetchMenu();
  }, [currentUser?.message?.user?._id]);

  return (
    <>
      {menus.length > 0 ? (
        <div>
          <div className="mx-auto max-w-7xl bg-zinc-50 px-2 ">
            <div className="flex flex-col space-y-8 pb-10 pt-12 px-2 md:pt-24">
              <p className="text-center font-serif  text-3xl text-gray-900  md:text-5xl md:leading-10">
                My Wishlist
              </p>
            </div>

            <div className="grid mx-2  gap-6 gap-y-10 py-6 md:grid-cols-1 lg:grid-cols-3 ">
              {menus.map((menu) => (
                <div
                  key={menu._id}
                  className=" border cursor-pointer mx-2   bg-gray-50  rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-1.02"
                >
                  <Link to={`/menu/${menu.slug}`}>
                    <img
                      src={menu.menuImage}
                      className=" px-3   w-full rounded-md"
                      alt="Menu Image"
                    />
                    <div className="min-h-min ">
                      <p className="mt-4 flex-1 text-2xl font-bold pb-4 text-gray-900 text-center ">
                        {menu.menuName}
                      </p>
                      <p className=" text-gray-600 text-center px-4 w-full text-sm leading-normal ">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: `${menu.menuDescription.slice(0, 180)}...`,
                          }}
                        />
                      </p>
                      <div className="flex py-4 items-center justify-around">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-red-500">
                            {menu.menuDiscount}% off
                          </span>
                          <span className="text-xl font-bold text-green-600">
                            ₹{menu.discountPrice}
                          </span>
                          <span className="text-gray-500 line-through">
                            ₹{menu.menuPrice}{" "}
                            {/* Original price with strikethrough */}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="rounded-md bg-[#E52A3D] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mx-auto items-center justify-center h-screen">
          <p className="text-2xl font-bold text-gray-900">
            Your Wishlist is empty
          </p>
          <Link
            to="/menu"
            className="px-3 py-2 mt-4 bg-[#E52A3D] text-white font-semibold rounded-md shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Explore Menu
          </Link>
        </div>
      )}
    </>
  );
}

export default WhistList;
