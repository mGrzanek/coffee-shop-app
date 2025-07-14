import { Form, Col, Row } from "react-bootstrap";

const UserDataForm = ({firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone, street, setStreet, streetNumber, setStreetNumber, city, setCity, validated }) => {
    const isFirstNameValid = /^[A-ZŻŹĆĄŚĘŁÓŃa-zżźćńółęąś]{3,20}$/.test(firstName);
    const isLastNameValid = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s-]{3,30}$/.test(lastName);
    const isPhoneValid = /^\d{9,16}$/.test(phone);
    const isEmailValid = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isStreetValid = /^[A-Za-z0-9\-. ]{3,40}$/.test(street);
    const isStreetNumberValid = /^[A-Za-z0-9]{1,5}(\/[A-Za-z0-9]{1,10})?$/i.test(streetNumber);
    const isCityValid = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\s.'/-]{3,40}$/.test(city);
    return(
        <>
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
                        <Form.Control className="mb-3 mx-1 " type="text" placeholder="Nr" value={streetNumber} onChange={e => setStreetNumber(e.target.value)} isInvalid={validated && (!isStreetNumberValid) } required />
                        <Form.Control.Feedback type="invalid">
                            Street number required.
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
        </>
    )
}

export default UserDataForm;