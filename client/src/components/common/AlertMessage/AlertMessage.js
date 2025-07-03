import { Alert, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../../redux/statusReducer";

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
            <Alert className="position-fixed top-50 z-2" variant={variant} onClose={() => dispatch(updateStatus(null))} dismissible>
                <Alert.Heading>{alertTitle}</Alert.Heading>
                <p>{alertContent}</p>
            </Alert>
        </Col>
    );
}


export default AlertMessage;