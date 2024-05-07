import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import './global-style.css';
import Login from './pages/Login';
import Courses from './pages/Courses';
import Settings from './pages/Settings';
import axios from 'axios';

const userData = {
  data: null,
  setData: (data) => {
    userData.data = data  
  },
  getData: () => {
    return userData.data
  }
}

const isAuthenticated = async () => {
  const token = localStorage.getItem('authToken');
    if(token){
      try {
        const { data } = await axios.get('http://localhost:3333/session',
          {
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }            
        );
        userData.setData(data)
        return true
      } catch (error) {
        return false
      }
    }
  return false
}

const router = await isAuthenticated() ? createBrowserRouter([
  {
    path: "/courses",
    element: <Courses userData={userData.getData} />,
  },
  {
    path: "/settings",
    element: <Settings userData={userData.getData} />,
  },
  {
    path: "*",
    element: <Navigate to='/courses' replace />,
  }
]): createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to='/' replace />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
