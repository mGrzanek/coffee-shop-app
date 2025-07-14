import PageTitle from "../../common/PageTitle/PageTitle";
import { Row } from "react-bootstrap";
import ProductItem from "../../features/ProductItem/ProductItem";
import { getUser } from "../../../redux/userReducer";
import { getAllProducts } from "../../../redux/productsReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const UserFavorites = () => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const products = useSelector(getAllProducts);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        if(user && products.length > 0) setFavorites(products.filter(product => product.users.some(u => u.id === user.id)));
    }, [products, user, dispatch]);
    return(
        <>
            <PageTitle>Favorites:</PageTitle>
            {user && favorites.length > 0 
                && <Row className="d-flex mx-auto px-3 py-4">
                {favorites.map(favorite => <ProductItem key={favorite.id} {...favorite} />)}
            </Row>}
        </>
        
    );
}

export default UserFavorites;