import { useParams } from "react-router-dom";
import ProductItem from "../../features/ProductItem/ProductItem";
import PageTitle from "../../common/PageTitle/PageTitle";
import { getAllProducts } from "../../../redux/productsReducer";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import { getStatus } from "../../../redux/statusReducer";

const SearchPhrase = () => {
    const {searchPhrase} = useParams();
    const products = useSelector(getAllProducts);
    const status = useSelector(getStatus);
    const regex = new RegExp(searchPhrase, 'i');
    const filteredProducts = products.filter(product => regex.test(product.name));

    return(
        <div className="pb-5">
            <PageTitle>Results: </PageTitle>
            {status === "clientConflict" && <AlertMessage variant="warning" alertTitle="Product limit" alertContent="You can add to cart max 10 pieces of selected product" />}
            {status === "authError" && <AlertMessage variant="warning" alertTitle="Only for logged users" alertContent="This action is possible only after logged" />}
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="Something went wrong" alertContent="Product not added to cart" />}
            <Row className="d-flex mx-auto px-3 py-4">
                {filteredProducts.map(product => product.available && <ProductItem key={product.id} {...product} />)}
                {filteredProducts.length === 0 && <PageTitle>Not found products...</PageTitle>}
            </Row>
        </div>
    );
}

export default SearchPhrase;