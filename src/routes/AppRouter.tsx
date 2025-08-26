import {createBrowserRouter, RouterProvider} from "react-router-dom"
import MainLayout from '@layouts/MainLayout/MainLayout';

import About from '@pages/About';
import Categories from '@pages/Categories';
import Products from '@pages/Products';


const router = createBrowserRouter([
  {
  path: "/",
  element: <MainLayout />
  ,
  children:[
    {
    index:true,
    element:<Products/>
    
  },
  {
    path:"/categories",
    element:<Categories/>
  },
  {
    path:"/about",
    element:<About/>
  },
]
  ,

  },
  
  
]);
const AppRouter = () => {
  return <RouterProvider router={router}/>
}

export default AppRouter