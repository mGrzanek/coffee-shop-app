import { Form } from "react-bootstrap";
import PageTitle from "../../common/PageTitle/PageTitle";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import UserDataForm from "../../features/UserDataForm/UserDataForm";
import { getUser } from "../../../redux/userReducer";
import { getStatus, updateStatus } from "../../../redux/statusReducer";
import { Button } from "react-bootstrap";
import { fetchUpdateUserData } from "../../../redux/userReducer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const UserAddressForm = () => {
    const user = useSelector(getUser);
    const status = useSelector(getStatus);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userAddress = user.address.split(',');
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phone, setPhone] = useState(user.phone);
    const [street, setStreet] = useState(userAddress[0]);
    const [streetNumber, setStreetNumber] = useState(userAddress[1]);
    const [city, setCity] = useState(userAddress[2]);
    const [validated, setValidated] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const updateUserData = e => {
        e.preventDefault();
        setValidated(true);
        if(isFormValid) {
            const address = [street, streetNumber, city];
            const userData = {
                firstName,
                lastName,
                phone,
                address
            };
            dispatch(fetchUpdateUserData(userData));
            navigate('/');
        } else dispatch(updateStatus('clientError'));
    }
    return(
        <Form className="col-10 col-sm-8 col-md-6 mx-auto" noValidate onSubmit={updateUserData}>
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="Incorrect data" alertContent="Invalid params." />}
            {status === "serverError" && <AlertMessage variant="danger" alertTitle="Something went wrong..." alertContent="Unexpected error... Please try again." />}
            <PageTitle>Update your data:</PageTitle>
            <UserDataForm firstName={firstName} setFirstName={setFirstName} lastName={lastName} 
                setLastName={setLastName} email={user.email} phone={phone} setPhone={setPhone} street={street} setStreet={setStreet}
                streetNumber={streetNumber} setStreetNumber={setStreetNumber} city={city} setCity={setCity} validated={validated} isUser={true} 
                isFormValid={isFormValid} setIsFormValid={setIsFormValid}/>
            <Button type='submit' className="btn-one">Save</Button>
        </Form>
    );
}

export default UserAddressForm;