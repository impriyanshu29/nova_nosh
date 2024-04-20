import React from 'react'



 function Dashboard() {
  return (
    <aside className="bg-slate-50 flex h-screen w-64 flex-col overflow-y-auto border-r  px-5 py-8">
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-logo_font font-bold text-[#E52A3D]">NOVA <span className="text-black">NOSH</span></h1>
            <button className="text-gray-600 focus:outline-none">
                {/* <Menu className="h-6 w-6" /> */}
            </button>
        </div>

      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900">analytics</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              {/* <BarChart className="h-5 w-5" aria-hidden="true" /> */}
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              {/* <Wallet className="h-5 w-5" aria-hidden="true" /> */}
              <span className="mx-2 text-sm font-medium">Sales</span>
            </a>
          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900">content</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              {/* <Newspaper className="h-5 w-5" aria-hidden="true" /> */}
              <span className="mx-2 text-sm font-medium">Blogs</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              {/* <BellRing className="h-5 w-5" aria-hidden="true" /> */}
              <span className="mx-2 text-sm font-medium">Notifications</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              {/* <Paperclip className="h-5 w-5" aria-hidden="true" /> */}
              <span className="mx-2 text-sm font-medium">Checklists</span>
            </a>
          </div>
        </nav>
        <div className="mt-6">
          <div className="rounded-lg bg-gray-100 p-3 ">
            <h2 className="text-sm font-medium text-gray-800">New feature availabel!</h2>
            <p className="mt-1 text-xs text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus harum officia eligendi
              velit.
            </p>
            <img
              className="mt-2 h-32 w-full rounded-lg object-cover"
              src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1806&q=80"
              alt="Feature"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <a href="#" className="flex items-center gap-x-2">
              <img
                className="h-7 w-7 rounded-full object-cover"
                src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                alt="avatar"
              />
              <span className="text-sm font-medium text-gray-700">Dan Abromov</span>
            </a>
            <a
              href="#"
              className="rotate-180 text-gray-800 transition-colors duration-200 hover:text-gray-900"
            >
              {/* <LogIn className="h-5 w-5" /> */}
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}


export default Dashboard
