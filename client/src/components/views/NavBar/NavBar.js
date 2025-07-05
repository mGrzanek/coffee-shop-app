import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import { getAllProducts } from "../../../redux/productsReducer";
import { getAllCartProducts } from "../../../redux/cartProductsReducer";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './NavBar.module.scss';

const NavBar = () => {
    const cartProducts = useSelector(getAllCartProducts);
    const products = useSelector(getAllProducts);
    const varieties = useMemo(() => {
    return [...new Set(products.map(product => product.variety))];
    }, [products]);

    return(
        <Navbar data-bs-theme="dark" className={styles.navbar}>
            <Container className="d-flex justify-content-around align-items-center">
                <Nav>
                    <Nav.Link className={styles.navLink} as={NavLink} to="/">Home</Nav.Link>
                    <div className={styles.productList}>
                        <Nav.Link className={styles.navLink}>Products</Nav.Link>
                        <ul className={styles.productVarieties}>
                            {varieties.map(variety => (
                                <li key={variety}>
                                    <Nav.Link className={styles.navLink} as={NavLink}  to={`/products/varieties/${variety}`}>
                                        Coffee {variety}
                                    </Nav.Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Nav>
                <Nav>
                    <Nav.Link className={styles.navLink} as={NavLink} to="/cart">
                        <FontAwesomeIcon className={styles.cart} icon={faCartShopping} />
                        {cartProducts.length > 0 && <div className={styles.cartBadge}>{cartProducts.length}</div>}
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;