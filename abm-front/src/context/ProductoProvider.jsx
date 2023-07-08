import { createContext, useState  } from "react"
import clienteAxios from "../config/axios"
import { toast } from "react-toastify";

const ProductoContext = createContext();
const ProductoProvider = ({children}) => {
    const [inputError, setInputErrores] = useState([])

    const storeProducto = async (datos, handleLimpiarCampos) => {
        try {
            const {data} = await clienteAxios.post('/api/productos', datos)
            handleLimpiarCampos()
            toast.success(data.message)
        } catch (error) {            
            setInputErrores(Object.values(error.response.data)[1])
        }
    }

    const updateProducto = async (datos, id, handleLimpiarCampos) => {
        try {
            const {data} = await clienteAxios.patch(`/api/productos/${id}`,datos)
            handleLimpiarCampos()
            toast.info(data.message)
        } catch (error) {
            setInputErrores(Object.values(error.response.data)[1])
        }
    }

    const destroyProducto = async (id, handleLimpiarCampos) => {
        try {
            const {message} = await clienteAxios.delete(`/api/productos/${id}`)
            handleLimpiarCampos()
            toast.info(message)
        } catch (error) {
            console.log(error);
        }
    }
    const storeCategoria = async (datos, handleLimpiarCampos) => {
        try {
            const {data} = await clienteAxios.post('/api/categorias', datos)
            handleLimpiarCampos()
            toast.success(data.message)
        } catch (error) {            
            setInputErrores(Object.values(error.response.data)[1])
        }
    }

    const updateCategoria = async (datos, id, handleLimpiarCampos) => {
        try {
            const {data} = await clienteAxios.patch(`/api/categorias/${id}`,datos)
            handleLimpiarCampos()
            toast.info(data.message)
        } catch (error) {
            setInputErrores(Object.values(error.response.data)[1])
        }
    }

    const destroyCategoria = async (id, handleLimpiarCampos) => {
        try {
            const {message} = await clienteAxios.delete(`/api/categorias/${id}`)
            handleLimpiarCampos()
            toast.info(message)
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <ProductoContext.Provider
            value={{
                storeProducto,
                updateProducto,
                destroyProducto,
                storeCategoria,
                updateCategoria,
                destroyCategoria,
                inputError,
                setInputErrores,
            }}
        >
            {children}
        </ProductoContext.Provider>
    )
}

export {
    ProductoProvider
}

export default ProductoContext