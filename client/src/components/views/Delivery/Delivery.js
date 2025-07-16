import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopesBulk, faTruck, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import styles from './Delivery.module.scss';

const Delivery = ({icon, method, price, leadTime}) => {
    const deliveryIcons = {
        faTruck: faTruck,
        faTruckFast: faTruckFast,
        faEnvelopesBulk: faEnvelopesBulk,
    };

    const deliveryTime = JSON.parse(leadTime);
    const deliveryMinTime = deliveryTime[0];
    const deliveryMaxTime = deliveryTime[1];

    return(
        <div className={styles.delivery}>
            <FontAwesomeIcon icon={deliveryIcons[icon]} />
            <span className='mx-2'>{method}</span>
            <span>${price}</span>
            {deliveryTime.length === 1 && <small className="text-muted mx-2"> {deliveryMinTime} day</small>}
            {deliveryTime.length > 1 && <small className="text-muted mx-2"> {deliveryMinTime} - {deliveryMaxTime} days</small>}
        </div>
    );
}

export default Delivery;