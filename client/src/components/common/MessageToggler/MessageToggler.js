import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const MessageToggler = ({ eventKey, activeKey, setActiveKey }) => {
  const handleClick = () => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  return (
    <FontAwesomeIcon className='cartItemBtn' icon={faPen} onClick={handleClick} />
  );
};

export default MessageToggler;
