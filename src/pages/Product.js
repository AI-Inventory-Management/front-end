import { useContext } from "react";
import Navbar from "../components/Navbar";
import { StoreContext } from "../components/StoreProvider";

function Product() {
    const [, , , , productId,] = useContext(StoreContext);

    return(
        <div>
            <Navbar title= {String(productId)} />
        </div>
    )
}

export default Product; 