import Swal from "sweetalert2";

import { useEffect, useState } from "react"
import clienteAxios from "../config/axios"
export default function Producto({producto, onUpdate, onDestroy}) {
    const { id, descripcion,  precio, categoria_id, estado} = producto;
    const [categoria, setCategoria] = useState([]);
         
    const handleEditar = (id) => {
      onUpdate(id); // Invocar la función de devolución de llamada y pasar el ID
    };
  

    useEffect(() => {
      // Realizar la llamada a la API para obtener las categorías
      obtenerCategorias();
    }, []);
    
    const obtenerCategorias = async () => {
      try {
          const {data} = await clienteAxios.get('/api/categorias')
          setCategoria(data);
      } catch (error) {
          console.log(error)
      }
  }

    const handleDestroy = (id) => {
      Swal.fire({
        title: `Estas seguro de ${estado ? "desactivar" : "activar"} el producto?`,
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Si, ${estado ? "Desactivar" : "Activar"}`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            `${estado ? "Desactivado" : "Activado"}`,
            "Aguarde mientras procesamos su pedido.",
            "success",
            onDestroy(id) // Invocar la función de devolución de llamada y pasar el ID
          );
        }
      });
    };

    const getCategoriaDescripcion = () => {
      if (categoria && categoria_id) {
        const categoriaEncontrada = categoria.find(cat => cat.id === categoria_id);
        return categoriaEncontrada ? categoriaEncontrada.descripcion : "Sin Categoría";
      }
      return "Sin Categoría";
    };
  return (
    <>
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-300 whitespace-nowrap">
                    {descripcion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                    {precio}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                    {estado === true ? "Activo" : "No Activo"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {getCategoriaDescripcion()}
                </td>
                <td className="flex flex-row mt-2  items-center gap-3">
                <button
                className="bg-yellow-600 w-full py-2 px-4 text-white rounded-lg text-xs font-bold uppercase text-center"
                onClick={() => {
                    handleEditar(id);
                }}
                >
                    Editar
                </button>
                    <button
                    className={`${estado ? "bg-red-600" : "bg-green-600"}  w-full mr-2 py-2 px-4 text-white rounded-lg text-xs font-bold uppercase text-center`}
                    onClick={() => {
                        handleDestroy(id);
                    }}
                >
                    {estado ? "Desactivar" : "Activar"}
                </button>
                </td>
            </tr>
        </tbody>
    </>
  )
}