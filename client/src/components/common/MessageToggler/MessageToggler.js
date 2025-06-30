import { useAccordionButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const MessageToggler = ({ eventKey}) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('clicked!'),
    );

    return(
        <FontAwesomeIcon className='cartItemBtn' icon={faPen} onClick={decoratedOnClick} />
    );
}

export default MessageToggler;