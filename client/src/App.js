import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Username from "./components/Username/Username"
import PageNotFound from "./components/PageNotFound"
import Password from "./components/Password/Password"
import Profile from "./components/Profile"
import Recovery from "./components/Recovery/Recovery"
import Register from "./components/Register/Register"
import Reset from "./components/Reset"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "recovery",
    element: <Recovery />,
  },
  {
    path: "reset",
    element: <Reset />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
])

const App = () => {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
