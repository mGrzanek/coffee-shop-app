import { Container } from "react-bootstrap";
import styles from './MainContainer.module.scss';
import PropTypes from 'prop-types';


const MainContainer = ({children}) => {
    return(
        <Container className={styles.container}>{children}</Container>
    );
}

MainContainer.propTypes = {
    children: PropTypes.node,
}

export default MainContainer;