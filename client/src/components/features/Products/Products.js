import { Row } from "react-bootstrap";
import { getProducts } from "../../../redux/productsReducer";
import { useSelector } from "react-redux";
import ProductItem from "./../../views/ProductItem/ProductItem";

const Products = () => {
    const products = useSelector(getProducts);
    return(
        <Row className="d-flex px-2 py-4">
            {products.map(product => <ProductItem key={product._id} {...product} />)}
        </Row>
    );
}

export default Products;