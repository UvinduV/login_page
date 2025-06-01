import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "./pages/Login.tsx";
import {Home} from "./pages/Home.tsx";

function App() {
  const routes= createBrowserRouter([
    {
      path:'/', element:<Login/>
    },
    {
      path:'/home', element:<Home/>
    }
  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
