import { getProducts } from "../../../redux/productsReducer";
import { useSelector } from "react-redux";
import ProductItem from "./../../views/ProductItem/ProductItem";

const Products = () => {
    const products = useSelector(getProducts);
    return(
        <>
            <h2>Products</h2>
            {products.map(product => <ProductItem key={product._id} {...product} />)}
        </>
    );
}

export default Products;