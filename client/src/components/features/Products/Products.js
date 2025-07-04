import { Row } from "react-bootstrap";
import { getAllProducts } from "../../../redux/productsReducer";
import { getStatus } from "../../../redux/statusReducer";
import { useSelector } from "react-redux";
import ProductItem from "./../../views/ProductItem/ProductItem";
import AlertMessage from "../../common/AlertMessage/AlertMessage";

const Products = () => {
    const products = useSelector(getAllProducts);
    const status = useSelector(getStatus);
    return(
        <>
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="Something went wrong" alertContent="Product not added to cart" />}
            <Row className="d-flex mx-auto px-3 py-4">
                {products.map(product => <ProductItem key={product.id} {...product} />)}
            </Row>
        </>
    );
}

export default Products;