import PropTypes from 'prop-types';
import styles from "./PageTitle.module.scss";

const PageTitle = ({children}) => {
    return(
        <div className={styles.pageTitle}>{children}</div>
    );
}

PageTitle.propTypes = {
    children: PropTypes.node,
}

export default PageTitle;