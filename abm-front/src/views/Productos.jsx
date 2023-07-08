import { createRef, useState, useEffect } from "react"
import useProductos from "../hooks/useProductos";
import Producto from "../components/Producto"
import clienteAxios from "../config/axios"
import Spiner from "../components/Spiner"
import { toast } from "react-toastify"
import useSWR from "swr"

export default function Productos() {
    const fetcher = () => clienteAxios('/api/productos').then(data => data.data)  
    const { data, isLoading, mutate } = useSWR('/api/productos', fetcher)

    const { storeProducto, updateProducto, destroyProducto, callErrors, inputError, setInputErrores} = useProductos()

    
    const precioRef      = createRef();
    const descripcionRef = createRef();
    const idCategoriaRef = createRef();

    const [editando, setEditando] = useState(false)
    const [editandoSelect, setEditandoSelect] = useState(false)
    const [idProducto, setIdProducto] = useState()
    const [categoria, setCategoria]     = useState([])
    
    const handleLimpiarCampos = () => {
        precioRef.current.value      = '',
        descripcionRef.current.value = '',
        idCategoriaRef.current.value = '',
        setEditando(false)
        setEditandoSelect(false)
        setCategoria([])
        mutate()
        setInputErrores([])
    }
    const handleSubmit = async e => {
        e.preventDefault()
        if(
            precioRef.current.value      === '' &&
            descripcionRef.current.value === '' &&
            idCategoriaRef.current.value === '' 
        ){
            toast.error("Todos los campos del formulario son obligatorios")
        }else{
        const datos = {
            descripcion:  descripcionRef.current.value,
            precio:       precioRef.current.value,
            categoria_id: editandoSelect ? categoria[0].id.id : idCategoriaRef.current.value,
        }
        editando ? updateProducto(datos, idProducto, handleLimpiarCampos) : storeProducto(datos, handleLimpiarCampos)
        }
    }
    const handleEditar = async id => {
        try {
            const response = await clienteAxios.get(`/api/productos/${id}`);
            const datos = response.data;
            if(!datos.estado) {
                toast.error("El producto debe estar activo para poder editarse")
            } else {
                precioRef.current.value       = datos.precio,
                descripcionRef.current.value  = datos.descripcion,
                setEditando(true)
                setIdProducto(datos.id)
                setEditandoSelect(true)
                setCategoria([{ id: datos.categoria_id, descripcion: datos.categoria_id.descripcion}]) 
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDestroy = id => {
        destroyProducto(id, handleLimpiarCampos);
    }

    const handleClickObtener = async () => {
        try {
            const {data} = await clienteAxios.get('/api/categorias')
            setEditandoSelect(false)
            setCategoria(data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (editando) {
        const categoriaActual = categoria.find((categoria) => categoria.id === categoria.id);
        console.log(categoriaActual);
        idCategoriaRef.current.value = categoriaActual ? categoriaActual : "";
        }
    }, [editando]);

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
                            <div className="mb-4 flex-col xl:w-1/3 md:w-1/3">
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
                            <div className="mb-4 flex-col xl:w-1/3 md:w-1/3">
                                <label
                                    className="text-slate-400"
                                    htmlFor="text"
                                >
                                    Precio:
                                </label>
                                <input 
                                    type="number"
                                    id="precio"
                                    className={inputError.precio ? "mt-2 w-full rounded-md block border text-white p-3 bg-gray-600 border-red-500" : "mt-2 w-full rounded-md block text-white p-3 bg-gray-600" }
                                    name="precio"
                                    ref={precioRef}
                                    placeholder="Precio"
                                />
                                {inputError.precio ? <p className="bg-red-500 text-white my-2 rounded-lg text-sm p-2 text-center">{inputError.precio}</p> : null}
                            </div>
                            <div className="mb-4 flex-col xl:w-1/3 md:w-1/3">
                                <label
                                    className="text-slate-400"
                                    htmlFor="select"
                                >
                                    Categoria:
                                </label>
                                <select
                                id="categoria_id"
                                className={inputError.categoria_id ? "mt-2 w-full rounded-md block border text-white p-3 bg-gray-600 border-red-500" : "mt-2 w-full rounded-md block text-white p-3 bg-gray-600" }
                                name="categoria_id"
                                onClick={handleClickObtener}
                                ref={idCategoriaRef}
                                defaultValue={""}
                                >
                                <option>-- Seleccione --</option>
                                    {categoria ? categoria.map((categoria) => {
                                    return (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.descripcion}
                                        </option>
                                    )
                                    }) : null}
                                </select>
                                {inputError.categoria_id ? <p className="bg-red-500 text-white my-2 rounded-lg text-sm p-2 text-center">{inputError.categoria_id}</p> : null}
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
                                                    Precio
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-300 uppercase">
                                                    Estado
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-300 uppercase">
                                                    Categoria
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-xs font-bold text-center text-gray-300 uppercase">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        {data.map(producto => (
                                        <Producto
                                            key={producto.id}
                                            producto={producto}
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
