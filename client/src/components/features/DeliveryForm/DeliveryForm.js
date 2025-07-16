import { Form } from 'react-bootstrap';
import Delivery from '../../views/Delivery/Delivery';
import PropTypes from 'prop-types';

const DeliveryForm = ({id, icon, method, price, leadTime, deliveryMethod, setDeliveryMethod}) => {
    return(
        <Form.Check 
            type="radio"
            className='py-2'
            id={id}
            key={id}
            name="deliveryMethod"
            label={
            <Delivery icon={icon} method={method} price={price} leadTime={leadTime} />
            }
            checked={deliveryMethod === id}
            onChange={() => setDeliveryMethod(id)}
        />
    )
}

DeliveryForm.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    leadTime: PropTypes.string.isRequired,
    deliveryMethod: PropTypes.string,
    setDeliveryMethod: PropTypes.func,
}

export default DeliveryForm;