import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './NavBar.module.scss';

const NavBar = () => {
    return(
        <Navbar data-bs-theme="dark" className={styles.navbar}>
            <Container className="d-flex justify-content-around">
                <Nav>
                    <Nav.Link className={styles.navLink} as={NavLink} to="/">Home</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className={styles.navLink} as={NavLink} to="/cart">
                        <FontAwesomeIcon className={styles.cart} icon={faCartShopping} />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;