import { Alert, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../../redux/statusReducer";
import PropTypes from 'prop-types';

const AlertMessage = ({variant, alertTitle, alertContent}) => {
    const dispatch = useDispatch();

    useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateStatus(null)); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

    return (
        <Col className="d-flex justify-content-center">
            <Alert className="position-fixed top-50 z-3" variant={variant} onClose={() => dispatch(updateStatus(null))} dismissible>
                <Alert.Heading className="px-2">{alertTitle}</Alert.Heading>
                <p className="px-3">{alertContent}</p>
            </Alert>
        </Col>
    );
}

AlertMessage.propTypes = {
  variant: PropTypes.string,
  alertTitle: PropTypes.string,
  alertContent: PropTypes.string,
}


export default AlertMessage;