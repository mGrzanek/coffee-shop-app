import { useParams } from "react-router-dom";
import ProductItem from "../../features/ProductItem/ProductItem";
import PageTitle from "../../common/PageTitle/PageTitle";
import { getAllProducts } from "../../../redux/productsReducer";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";

const SearchPhrase = () => {
    const {searchPhrase} = useParams();
    const products = useSelector(getAllProducts);
    const regex = new RegExp(searchPhrase, 'i');
    const filteredProducts = products.filter(product => regex.test(product.name));

    return(
        <div className="pb-5">
            <PageTitle>Results: </PageTitle>
            <Row className="d-flex mx-auto px-3 py-4">
                {filteredProducts.map(product => product.available && <ProductItem key={product.id} {...product} />)}
                {filteredProducts.length === 0 && <PageTitle>Not found products...</PageTitle>}
            </Row>
        </div>
    );
}

export default SearchPhrase;