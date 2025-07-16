import styles from "./Footer.module.scss";
import ModalPage from "../../common/ModalPage/ModalPage";
import Delivery from "../Delivery/Delivery";
import ContentExample from "../ContentExample/ContentExample";
import Contact from "../Contact/Contact";
import { getAllDeliveries } from "../../../redux/deliveryReducer";
import { useSelector } from "react-redux";

const Footer = () => {
    const deliveries = useSelector(getAllDeliveries);
    return(
        <div className={styles.footer}>
            <div className="d-flex justify-content-center align-items-center py-3">
                <ModalPage header='Deliveries'>
                    {deliveries.map(delivery => <Delivery key={delivery.id} {...delivery} />)}
                </ModalPage>
                <ModalPage header='Privacy Policy'>
                    <ContentExample />
                </ModalPage>
                <ModalPage header='Terms of Service'>
                    <ContentExample />
                </ModalPage>
                <ModalPage header='Contact'>
                    <Contact/>
                </ModalPage>
            </div>
            <div className="text-center text-light"> &copy; 2025 Coffee Delicious shop.  All rights reserved.</div>
        </div>
       
    )
}

export default Footer;