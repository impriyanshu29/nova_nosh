import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Importing the pages
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Menu from './Pages/Menu.jsx'
import Order_Online from './Pages/Order_Online.jsx'
import Reservation from './Pages/Reservation.jsx'
import Contact from './Pages/Contact.jsx'
import SignIn from './Pages/SignIn.jsx'
import SignUp from './Pages/SignUp.jsx'
import VerifyEmail from './Pages/VerifyEmail.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/menu',
        element: <Menu />
      
      },
      {
        path:'/signIn',
        element:<SignIn/>
      },
      {
        path:'/signUp',
        element:<SignUp/>
      },
      {
        path: '*',
        element: <div>404 Not Found</div>
      },
      {
        path:'/order',
        element:<Order_Online/>
        
      },
      {
        path:'/reservations',
        element:<Reservation/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },
      {
        path:'/verifyEmail',
        element:<VerifyEmail/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)


