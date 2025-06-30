import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { updateClientThunk } from "../../../redux/clientReducer";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [city, setCity] = useState('');
    const [validated, setValidated] = useState(false);

    const isFirstNameValid = /^[A-ZŻŹĆĄŚĘŁÓŃa-zżźćńółęąś]{3,20}$/.test(firstName);
    const isLastNameValid = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s-]{3,30}$/.test(lastName);
    const isPhoneValid = /^\d{9,16}$/.test(phone);
    const isEmailValid = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isStreetValid = /^[A-Za-z0-9\-. ]{3,40}$/.test(street);
    const isStreetNumberValid = /^[A-Za-z0-9]{1,5}(\/[A-Za-z0-9]{1,10})?$/i.test(streetNumber);
    const isCityValid = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\s.'/-]{3,40}$/.test(city);

    const addClient = e => {
        e.preventDefault();
        setValidated(true);
        if(isFirstNameValid && isLastNameValid && isPhoneValid && isEmailValid && isStreetValid && isCityValid && isStreetNumberValid) {
            const address = [street, streetNumber, city];
            const client = {
                firstName,
                lastName,
                phone,
                email, 
                address
            }
            dispatch(updateClientThunk(client));
            setFirstName('');
            setLastName('');
            setPhone('');
            setEmail('');
            setStreet('');
            setStreetNumber('');
            setCity('');
            navigate('/order/summary')
        } else console.log('Wrong params');
    }

    return(
        <Form className="col-10 col-sm-8 col-md-6 mx-auto" noValidate onSubmit={addClient}>
            <h2 className="my-4">Client details</h2>
            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>Firstname: </Form.Label>
                <Form.Control type="text" placeholder="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} isInvalid={validated && (!isFirstNameValid) } required />
                <Form.Control.Feedback type="invalid">
                    Must be between 3 and 20 characters long.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Lastname: </Form.Label>
                <Form.Control type="text"  placeholder="Lastname" value={lastName} onChange={e => setLastName(e.target.value)} isInvalid={validated && (!isLastNameValid) } required />
                <Form.Control.Feedback type="invalid">
                    Must be between 3 and 20 characters long.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone: </Form.Label>
                <Form.Control type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} isInvalid={validated && (!isPhoneValid)} required />
                <Form.Control.Feedback type="invalid">
                    Must be between 9 and 16 digits long, digits only.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} isInvalid={validated && (!isEmailValid)} required />
                <Form.Control.Feedback type="invalid">
                    Invalid email
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address: </Form.Label>
                <Form.Control className="mb-3" type="text" placeholder="Street" value={street} onChange={e => setStreet(e.target.value)} isInvalid={validated && (!isStreetValid)} required />
                <Form.Control.Feedback type="invalid">
                    Must be between 3 and 30 characters long.
                </Form.Control.Feedback>
                <Row className="mb-3">
                    <Col xs={4}>
                        <Form.Control className="mb-3 mx-1 " type="text" placeholder="Number" value={streetNumber} onChange={e => setStreetNumber(e.target.value)} isInvalid={validated && (!isStreetNumberValid) } required />
                        <Form.Control.Feedback type="invalid">
                            Postal code required.
                        </Form.Control.Feedback>
                    </Col>
                    <Col xs={8}>
                        <Form.Control className="mb-3" type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} isInvalid={validated && (!isCityValid) } required />
                        <Form.Control.Feedback type="invalid">
                            Must be between 3 and 30 characters long.
                        </Form.Control.Feedback>
                    </Col>
                </Row>
            </Form.Group>
            <Button type="submit" variant="outline-light" className="btn-one">Add</Button>
        </Form>
    );
}

export default OrderForm;