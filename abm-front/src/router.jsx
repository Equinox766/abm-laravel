import { createBrowserRouter } from "react-router-dom"
import Layout from './layouts/Layout'
import Inicio from './views/Inicio'
import Categorias from './views/Categorias'
import Productos from './views/Productos'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
      {
        path: "categorias",
        element: <Categorias />,
      },
      {
        path: "productos",
        element: <Productos />,
      },
    ],
  },
]);

export default router;
