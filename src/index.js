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
import studyNestApi from './services/apiStudyNest';
import SettingsCourse from './pages/Settings/Course';
import SettingsLesson from './pages/Settings/Lesson';
import ShowCourse from './pages/Courses/Course';

const isAuthenticated = async () => {
  const token = localStorage.getItem('authToken');
    if(token){
      try {
        await studyNestApi.get('session', {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

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
    element: <Courses />,
  },
  {
    path: "/courses/:courseId",
    element: <ShowCourse />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/settings/course/:courseId",
    element: <SettingsCourse />,
  },
  {
    path: "/settings/lesson/:courseId/:lessonId",
    element: <SettingsLesson />,
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
