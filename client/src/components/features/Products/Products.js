import { Row } from "react-bootstrap";
import { getAllProducts } from "../../../redux/productsReducer";
import { useSelector } from "react-redux";
import ProductItem from "./../../views/ProductItem/ProductItem";

const Products = () => {
    const products = useSelector(getAllProducts);
    return(
        <Row className="d-flex mx-auto px-3 py-4">
            {products.map(product => <ProductItem key={product.id} {...product} />)}
        </Row>
    );
}

export default Products;