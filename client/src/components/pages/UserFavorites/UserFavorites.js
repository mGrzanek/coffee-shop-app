import PageTitle from "../../common/PageTitle/PageTitle";
import Loader from "../../common/Loader/Loader";
import ProductItem from "../../features/ProductItem/ProductItem";
import { getUser } from "../../../redux/userReducer";
import { getStatus } from "../../../redux/statusReducer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserFavorites = () => {
    const user = useSelector(getUser);
    const status = useSelector(getStatus);

    
    return(
        <>
            <PageTitle>Favorites:</PageTitle>
            {!user && status === 'pending' && <Loader />}
            {!user && status !== 'pending' && <Navigate to='/' />}
            {user && status !== 'pending' && user.favorites.map(favoriteProduct => <ProductItem key={favoriteProduct.id} {...favoriteProduct} />)}
        </>
        
    );
}

export default UserFavorites;