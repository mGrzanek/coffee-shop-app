import { Form } from "react-bootstrap";
import PageTitle from "../../common/PageTitle/PageTitle";
import UserDataForm from "../../features/UserDataForm/UserDataForm";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { 
    isFirstNameValid,
    isLastNameValid,
    isPhoneValid,
    isEmailValid,
    isStreetValid,
    isStreetNumberValid,
    isCityValid } from "../../../utils/validators";

const UserAddressForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [city, setCity] = useState('');
    const [validated, setValidated] = useState(false);


    const updateUserData = e => {
        e.preventDefault();
        setValidated(true);
          const isFormValid =
            isFirstNameValid(firstName) &&
            isLastNameValid(lastName) &&
            isPhoneValid(phone) &&
            isEmailValid(email) &&
            isStreetValid(street) &&
            isStreetNumberValid(streetNumber) &&
            isCityValid(city);
        if(isFormValid) {
            console.log('updated');
        } else console.log('invalid data');
    }
    return(
        <Form className="col-10 col-sm-8 col-md-6 mx-auto" noValidate onSubmit={updateUserData}>
            <PageTitle>Update your data:</PageTitle>
            <UserDataForm firstName={firstName} setFirstName={setFirstName} lastName={lastName} 
                setLastName={setLastName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} street={street} setStreet={setStreet}
                streetNumber={streetNumber} setStreetNumber={setStreetNumber} city={city} setCity={setCity} validated={validated} />
            <Button type='submit' className="btn-one">Save</Button>
        </Form>
    );
}

export default UserAddressForm;