import { createRef, useState, useEffect } from "react"
import useProductos from "../hooks/useProductos"
import Categoria from "../components/Categoria"
import clienteAxios from "../config/axios"
import Spiner from "../components/Spiner"
import { toast } from "react-toastify"
import useSWR from "swr"

export default function Categorias() {
    const fetcher = () => clienteAxios('/api/categorias').then(data => data.data)  
    const { data, isLoading, mutate } = useSWR('/api/categorias', fetcher)

    const { storeCategoria, updateCategoria, destroyCategoria, callErrors, inputError, setInputErrores} = useProductos()

    
    const descripcionRef = createRef();

    const [editando, setEditando] = useState(false)
    const [idCategoria, setIdCategoria] = useState()
    
    const handleLimpiarCampos = () => {
        descripcionRef.current.value = '',
        mutate()
        setInputErrores([])
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const datos = {
            descripcion:  descripcionRef.current.value,
        }
        editando ? updateCategoria(datos, idCategoria, handleLimpiarCampos) : storeCategoria(datos, handleLimpiarCampos)
    }
    const handleEditar = async id => {
        try {
            const response = await clienteAxios.get(`/api/categorias/${id}`);
            const datos = response.data;
            if(!datos.estado) {
                toast.error("La categoría debe estar activa para poder editarse")
            } else {
                descripcionRef.current.value  = datos.descripcion,
                setIdCategoria(datos.id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDestroy = id => {
        destroyCategoria(id, handleLimpiarCampos);
    }


    if(isLoading) return (
        <>
        <div className="bg-gray-700 w-full min-h-screen flex justify-center items-center">
        <div className="bg-slate-800 p-10 shadow-md rounded-xl relative">
            <Spiner />
        </div>
        </div>
        </>
    );
    return (
        <aside>
            <div className="px-4 mt-6">
                <div className="bg-slate-800 shadow-md rounded-md mt-0 px-5 py-10">
                    <form 
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <div className="xl:flex md:flex gap-2">
                            <div className="mb-4 flex-col w-full">
                            <label
                                className="text-slate-400"
                                htmlFor="text"
                            >
                                Descripcion:
                            </label>
                            <input 
                                type="text"
                                id="descripcion"
                                className={inputError.descripcion ? "mt-2 w-full rounded-md block border text-white p-3 bg-gray-600 border-red-500" : "mt-2 w-full rounded-md block text-white p-3 bg-gray-600" }
                                name="descripcion"
                                ref={descripcionRef}
                                placeholder="Descripcion"
                                />
                                {inputError.descripcion ? <p className="bg-red-500 text-white my-2 rounded-lg text-sm p-2 text-center">{inputError.descripcion}</p> : null}

                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <input type="submit" 
                            value={editando ? "Guardar cambios" : "Enviar datos"}
                            className="bg-indigo-600  hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer" />
                            <input type="button" value="Limpiar Campos" 
                            onClick={handleLimpiarCampos}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer" />
                        </div>
                    </form>
                </div>
            <div className="dark:bg-slate-800 max-h-96 overflow-x-auto shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-800 dark:text-gray-100">
                <div className="flex flex-col">
                        <div className="overflow-x-auto">
                            <div className="p-1.5 w-full inline-block align-middle">
                                <div className="overflow-hidden border rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-900">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-300 uppercase">
                                                    Descripción
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-300 uppercase">
                                                    Estado
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-xs font-bold text-center text-gray-300 uppercase">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        {data.map(categoria => (
                                        <Categoria
                                            key={categoria.id}
                                            categoria={categoria}
                                            onUpdate={handleEditar}
                                            onDestroy={handleDestroy}
                                        />
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
            </div>
            </div>
        </aside>
    )
}
