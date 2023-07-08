import { createContext, useState  } from "react"
import clienteAxios from "../config/axios"
import { toast } from "react-toastify";

const ProductoContext = createContext();
const ProductoProvider = ({children}) => {
    const [errores, setErrores] = useState()
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
            console.log(error);
            // setInputErrores(Object.values(error.response.data)[1])
        }
    }

    const destroyProducto = async (id, handleLimpiarCampos) => {
        try {
            const {message} = await clienteAxios.delete(`/api/productos/${id}`)
            handleLimpiarCampos()
            toast.info(message)
        } catch (error) {
            callErrors(error);
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
            console.log(error);
            // setInputErrores(Object.values(error.response.data)[1])
        }
    }

    const destroyCategoria = async (id, handleLimpiarCampos) => {
        try {
            const {message} = await clienteAxios.delete(`/api/categorias/${id}`)
            handleLimpiarCampos()
            toast.info(message)
        } catch (error) {
            callErrors(error);
        }
    }
    
    const callErrors = error => {
        console.log(error);
        // setErrores(Object.values(error.response.data.errors));
        // errores ? errores.map((error, i) => {
        //     toast.error(`${error}`,{
        //         toastId: i        
        //     })
        // }) : null 
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
                callErrors,
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