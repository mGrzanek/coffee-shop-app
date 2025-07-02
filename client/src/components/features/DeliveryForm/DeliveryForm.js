import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopesBulk, faTruck, faTruckFast } from '@fortawesome/free-solid-svg-icons';

const DeliveryForm = ({id, icon, method, price, leadTime, deliveryMethod, setDeliveryMethod}) => {
    const deliveryIcons = {
        faTruck: faTruck,
        faTruckFast: faTruckFast,
        faEnvelopesBulk: faEnvelopesBulk,
    };

    const deliveryTime = JSON.parse(leadTime);
    const deliveryMinTime = deliveryTime[0];
    const deliveryMaxTime = deliveryTime[1];

    return(
        <Form.Check 
            type="radio"
            className='py-2'
            id={id}
            key={id}
            name="deliveryMethod"
            label={
            <div >
                <FontAwesomeIcon icon={deliveryIcons[icon]} />
                <span className='mx-2'>{method}</span>
                <span>${price}</span>
                {deliveryTime.length === 1 && <small className="text-muted mx-2"> {deliveryMinTime} day</small>}
                {deliveryTime.length > 1 && <small className="text-muted mx-2"> {deliveryMinTime} - {deliveryMaxTime} days</small>}
            </div>
            }
            checked={deliveryMethod === id}
            onChange={() => setDeliveryMethod(id)}
        />
    )
}

export default DeliveryForm;