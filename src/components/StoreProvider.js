import { createContext, useState } from "react";
export const StoreContext = createContext();

const StoreProvider = ({children}) =>{
    const [storesId, setStoresId] = useState([]);
    const [storeName, setStoreName] = useState([]);
    const [productId, setProductId] = useState([]);
    return (
        <StoreContext.Provider value={[storesId, setStoresId, storeName, setStoreName, productId, setProductId]}>{children}</StoreContext.Provider>
    )
}

export default StoreProvider

