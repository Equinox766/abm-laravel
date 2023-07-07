import { createContext } from "react"
const ProductoContext = createContext();
const ProductoProvider = ({children}) => {
    return (
        <ProductoContext.Provider
            value={{}}
        >
            {children}
        </ProductoContext.Provider>
    )
}

export {
    ProductoProvider
}

export default ProductoContext