import { Row } from "react-bootstrap";
import PageTitle from "../../common/PageTitle/PageTitle";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../../redux/productsReducer";
import { getStatus } from "../../../redux/statusReducer";
import { useSelector } from "react-redux";
import ProductItem from "../../features/ProductItem/ProductItem";
import AlertMessage from "../../common/AlertMessage/AlertMessage";

const ProductVarieties = () => {
    const {variety} = useParams();
    const status = useSelector(getStatus);
    const products = useSelector(getAllProducts);
    const filteredProducts = products.filter(product => product.variety === variety && product.available);

    return(
        <>
            <PageTitle>Coffee {variety}</PageTitle>
            {status === "clientConflict" && <AlertMessage variant="warning" alertTitle="Product limit" alertContent="You can add to cart max 10 pieces of selected product" />}
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="Something went wrong" alertContent="Product not added to cart" />}
            <Row className="d-flex mx-auto px-3 py-4">{filteredProducts.map(product => <ProductItem key={product.id} {...product} />)}</Row>
        </>
    );
}

export default ProductVarieties;