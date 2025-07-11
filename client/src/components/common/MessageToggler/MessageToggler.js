const MessageToggler = ({ children, eventKey, activeKey, setActiveKey }) => {
  const handleClick = () => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  return (
    <div onClick={handleClick}>{children}</div>
  );
};

export default MessageToggler;
