import PageTitle from "../../common/PageTitle/PageTitle";
import Loader from "../../common/Loader/Loader";
import { Row } from "react-bootstrap";
import ProductItem from "../../features/ProductItem/ProductItem";
import { getUser } from "../../../redux/userReducer";
import { getAllProducts } from "../../../redux/productsReducer";
import { getStatus, updateStatus} from "../../../redux/statusReducer";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserFavorites = () => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const status = useSelector(getStatus);
    const products = useSelector(getAllProducts);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        if(user && products.length > 0) setFavorites(products.filter(product => product.users.some(u => u.id === user.id)));
        else setTimeout(() => {
            if(!user) dispatch(updateStatus('authError'));
            else dispatch(updateStatus(null));
        }, 500 )
    }, [products, user, dispatch]);
    
    return(
        <>
            <PageTitle>Favorites:</PageTitle>
            {!user && status === 'pending' && <Loader />}
            {!user && status === 'authError' && <Navigate to='/' />}
            {user && status !== 'pending' && favorites.length > 0 
                && <Row className="d-flex mx-auto px-3 py-4">
                {favorites.map(favorite => <ProductItem key={favorite.id} {...favorite} />)}
            </Row>}
        </>
        
    );
}

export default UserFavorites;