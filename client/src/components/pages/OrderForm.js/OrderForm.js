import { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button} from "react-bootstrap";
import UserDataForm from "../../features/UserDataForm/UserDataForm";
import { updateClientThunk } from "../../../redux/clientReducer";
import { getAllDeliveries } from "../../../redux/deliveryReducer";
import { getStatus, updateStatus } from "../../../redux/statusReducer";
import { useNavigate } from "react-router-dom";
import DeliveryForm from "../../features/DeliveryForm/DeliveryForm";
import PageTitle from "../../common/PageTitle/PageTitle";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import { getUser } from "../../../redux/userReducer";

const OrderForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deliveries = useSelector(getAllDeliveries);
    const status = useSelector(getStatus);
    const user = useSelector(getUser);
    const [isUser, setIsUser] = useState(false);
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [street, setStreet] = useState(user?.address.split(',')[0] || '');
    const [streetNumber, setStreetNumber] = useState(user?.address.split(',')[1] || '');
    const [city, setCity] = useState(user?.address.split(',')[2] || '');
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [validated, setValidated] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if(deliveries && deliveries.length > 0 && deliveryMethod === '') setDeliveryMethod(deliveries[0].id)
    }, [deliveries, deliveryMethod]);

    useEffect(() => {
        if(user) setIsUser(true);
        else setIsUser(false);
    }, [user]);

    const addClient = e => {
        e.preventDefault();
        setValidated(true);
        if(isFormValid && deliveryMethod) {
            const address = [street, streetNumber, city];
            const deliveryPrice = deliveries.find(delivery => delivery.id === deliveryMethod).price;
            const client = {
                firstName,
                lastName,
                phone,
                email: user ? user.email : email, 
                address,
                deliveryPrice,
                deliveryMethod,
            }
            dispatch(updateClientThunk(client));
            if(!user){
                setFirstName('');
                setLastName('');
                setPhone('');
                setEmail('');
                setStreet('');
                setStreetNumber('');
                setCity('');
            }
            navigate('/order/summary')
        } else dispatch(updateStatus('clientError'));
    }

    return(
        <>
            {status === 'clientError' && <AlertMessage variant="danger" alertTitle="Incorrect data" alertContent="Invalid params." />}
            {deliveries.length === 0 && <Loader />}
            {deliveries.length > 0 && <Form className="col-10 col-sm-8 col-md-6 mx-auto" noValidate onSubmit={addClient}>
                <PageTitle>Client details:</PageTitle>
                <UserDataForm firstName={firstName} setFirstName={setFirstName} lastName={lastName} 
                setLastName={setLastName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} street={street} setStreet={setStreet}
                streetNumber={streetNumber} setStreetNumber={setStreetNumber} city={city} setCity={setCity} validated={validated} isUser={isUser} 
                isFormValid={isFormValid} setIsFormValid={setIsFormValid} />
                <PageTitle>Delivery methods:</PageTitle>
                <Form.Group className="mb-4">
                    {deliveries.map(delivery => (
                        <DeliveryForm key={delivery.id} {...delivery} deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} />
                    ))}
                </Form.Group>
                <Button type="submit" variant="outline-light" className="btn-one">Order summary</Button>
            </Form>}
        </>
    );
}

export default OrderForm;