import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import { getAllProducts } from "../../../redux/productsReducer";
import { getUser } from "../../../redux/userReducer";
import { getAllCartProducts } from "../../../redux/cartProductsReducer";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faUserPlus, faKey, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import styles from './NavBar.module.scss';

const NavBar = () => {
    const cartProducts = useSelector(getAllCartProducts);
    const products = useSelector(getAllProducts);
    const user = useSelector(getUser);
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
                    {user && <div className={styles.productList}>   
                        <Nav.Link className={styles.navLink}>
                            <FontAwesomeIcon className={`${styles.cart}, d-md-none`} icon={faUser} />
                            <span className={`${styles.navLink} d-none d-md-block`}>Account</span>
                        </Nav.Link>
                        <ul className={styles.productVarieties}>
                            <li>
                                <Nav.Link className={styles.navLink} as={NavLink}  to={`/user/favorites`}>
                                    Favorites
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav.Link className={styles.navLink} as={NavLink}  to={`/user/orders`}>
                                    Orders
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav.Link className={styles.navLink} as={NavLink}  to={`/user/settings`}>
                                    Settings
                                </Nav.Link>
                            </li>
                        </ul>
                    </div>}
                    {user && <Nav.Link className={styles.navLink} as={NavLink} to="/logout">
                        <FontAwesomeIcon className={`${styles.cart}, d-md-none`} icon={faPowerOff} />
                        <span className="d-none d-md-block">Log out</span>
                    </Nav.Link>}
                    {!user && <Nav.Link className={styles.navLink} as={NavLink} to="/login">
                        <FontAwesomeIcon className={`${styles.cart}, d-md-none`} icon={faKey} />
                        <span className="d-none d-md-block">Sign in</span>
                    </Nav.Link>}
                    {!user && <Nav.Link className={styles.navLink} as={NavLink} to="/register">
                        <FontAwesomeIcon className={`${styles.cart}, d-md-none`} icon={faUserPlus} />
                        <span className="d-none d-md-block">Sign up</span>
                    </Nav.Link>}
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