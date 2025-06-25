import styles from "./Footer.module.scss";
import clsx from "clsx";

const Footer = () => {
    return(
        <div className={clsx("p-3 text-center text-light", styles.footer)}>Copyright &copy; Delicious Coffee shop 2025</div>
    )
}

export default Footer;