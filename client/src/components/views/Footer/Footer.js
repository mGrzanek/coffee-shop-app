import styles from "./Footer.module.scss";
import clsx from "clsx";

const Footer = () => {
    return(
        <div className={clsx("p-3 text-center text-light", styles.footer)}> &copy; 2025 Coffee Delicious shop.  All rights reserved.</div>
    )
}

export default Footer;