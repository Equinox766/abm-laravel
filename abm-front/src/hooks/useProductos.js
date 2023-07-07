import { useContext } from 'react'
import ProductoContext from '../context/ProductoProvider'

const useProductos = () => {
    return useContext(ProductoContext)
}

export default useProductos