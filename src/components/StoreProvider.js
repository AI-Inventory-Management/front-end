import { createContext, useState } from "react";
export const StoreContext = createContext();

const StoreProvider = ({children}) =>{
    const [storesId, setStoresId] = useState([]);
    const [storeName, setStoreName] = useState([]);
    return (
        <StoreContext.Provider value={[storesId, setStoresId, storeName, setStoreName]}>{children}</StoreContext.Provider>
    )
}

export default StoreProvider

