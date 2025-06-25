import { Container } from "react-bootstrap";
import styles from './MainContainer.module.scss';

const MainContainer = ({children}) => {
    return(
        <Container className={styles.container}>{children}</Container>
    );
}

export default MainContainer;