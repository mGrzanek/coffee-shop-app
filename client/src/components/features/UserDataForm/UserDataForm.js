import { Form, Col, Row } from "react-bootstrap";
import PropTypes from 'prop-types';
import { 
    isFirstNameValid,
    isLastNameValid,
    isPhoneValid,
    isEmailValid,
    isStreetValid,
    isStreetNumberValid,
    isCityValid } from "../../../utils/validators";

const UserDataForm = ({firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone, street, setStreet, streetNumber, setStreetNumber, city, setCity, validated }) => {
    return(
        <>
            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>Firstname: </Form.Label>
                <Form.Control type="text" placeholder="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} isInvalid={validated && (!isFirstNameValid(firstName)) } required />
                <Form.Control.Feedback type="invalid">
                    Must be between 3 and 20 characters long.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Lastname: </Form.Label>
                <Form.Control type="text"  placeholder="Lastname" value={lastName} onChange={e => setLastName(e.target.value)} isInvalid={validated && (!isLastNameValid(lastName)) } required />
                <Form.Control.Feedback type="invalid">
                    Must be between 3 and 20 characters long.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone: </Form.Label>
                <Form.Control type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} isInvalid={validated && (!isPhoneValid(phone))} required />
                <Form.Control.Feedback type="invalid">
                    Must be between 9 and 16 digits long, digits only.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} isInvalid={validated && (!isEmailValid(email))} required />
                <Form.Control.Feedback type="invalid">
                    Invalid email
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address: </Form.Label>
                <Form.Control className="mb-3" type="text" placeholder="Street" value={street} onChange={e => setStreet(e.target.value)} isInvalid={validated && (!isStreetValid(street))} required />
                <Form.Control.Feedback type="invalid">
                    Must be between 3 and 30 characters long.
                </Form.Control.Feedback>
                <Row className="mb-3">
                    <Col xs={4}>
                        <Form.Control className="mb-3 mx-1 " type="text" placeholder="Nr" value={streetNumber} onChange={e => setStreetNumber(e.target.value)} isInvalid={validated && (!isStreetNumberValid(streetNumber)) } required />
                        <Form.Control.Feedback type="invalid">
                            Street number required.
                        </Form.Control.Feedback>
                    </Col>
                    <Col xs={8}>
                        <Form.Control className="mb-3" type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} isInvalid={validated && (!isCityValid(city)) } required />
                        <Form.Control.Feedback type="invalid">
                            Must be between 3 and 30 characters long.
                        </Form.Control.Feedback>
                    </Col>
                </Row>
            </Form.Group>
        </>
    )
}

UserDataForm.propTypes = {
    firstName: PropTypes.string.isRequired,
    setFirstName: PropTypes.func.isRequired,
    lastName: PropTypes.string.isRequired,
    setLastName: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    phone: PropTypes.string.isRequired,
    setPhone: PropTypes.func.isRequired,
    street: PropTypes.string.isRequired,
    setStreet: PropTypes.func.isRequired,
    streetNumber: PropTypes.string.isRequired,
    setStreetNumber: PropTypes.func.isRequired,
    city: PropTypes.string.isRequired,
    setCity: PropTypes.func.isRequired,
    validated: PropTypes.bool.isRequired,
}

export default UserDataForm;