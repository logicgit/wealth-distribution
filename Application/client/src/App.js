import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"

import Home from "./pages/Home"
import WealthRedistribution from "./pages/WealthRedistribution"
import RealtimeContext from "./pages/RealtimeContext"
import Debug from "./pages/Debug"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


const Layout = () => {
  return(
    <>
      <Navbar /> 
      <Outlet /> 
      <Footer /> 
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path: "/WealthRedistribution",
        element: <WealthRedistribution/>
      },
      {
        path: "/RealtimeContext",
        element: <RealtimeContext/>
      },
      {
        path: "/Debug",
        element: <Debug/>
      },      
    ]
  }
])

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
