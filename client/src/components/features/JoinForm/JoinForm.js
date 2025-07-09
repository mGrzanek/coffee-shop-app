import { Form, Button } from 'react-bootstrap';
import { getStatus, updateStatus } from "../../../redux/statusReducer";
import { useDispatch, useSelector } from "react-redux";
import { emailValidator } from '../../../utils/emailValidator';
import Loader from "../../common/Loader/Loader";
import PageTitle from '../../common/PageTitle/PageTitle';
import { useState } from "react";
import AlertMessage from '../../common/AlertMessage/AlertMessage';
import { API_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

const JoinForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(getStatus);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [validated, setValidated] = useState(false);
    const isEmailValid = emailValidator(email);
    const isPasswordValid = /^[A-Za-z0-9!@#$%^&*_+-?]{10,}$/.test(password);
    const isRepeatPassword = password === passwordRepeat;

    const handleSubmit = e => {
        e.preventDefault();
        setValidated(true)
        if(isEmailValid && isPasswordValid && isRepeatPassword){
            const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({email, password, passwordRepeat})
        };
        dispatch(updateStatus('pending'));
        fetch(`${API_URL}/api/auth/register`, options)
            .then(res => {
                    if(res.ok) {
                        dispatch(updateStatus('success'));
                        navigate('/')
                    }
                    else if(res.status === 400) dispatch(updateStatus("clientError"));
                    else if(res.status === 409) dispatch(updateStatus("loginError"));
                    else dispatch(updateStatus("serverError"));
                }
                
            )
        }
    }

    return(
        <Form className="col-12 col-sm-8 col-md-4 mx-auto" noValidate onSubmit={handleSubmit}>
            {status === "loginError" && <AlertMessage variant="warning" alertTitle="Email exist yet" alertContent="Email is already taken" />}
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="Invalid data" alertContent="YYou must complete all fields correctly." />}
            {status === "serverError" && <AlertMessage variant="danger" alertTitle="Something went wrong..." alertContent="Unexpected error... Please try again." />}
            {status === "pending" && <Loader />}
            <h2 className="my-4 text-warning">
                <PageTitle>Sign up</PageTitle>
            </h2>
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} isInvalid={validated && !isEmailValid} required />
                <Form.Control.Feedback type="invalid">
                    Invalid email.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password"  placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} isInvalid={validated && !isPasswordValid } required />
                <Form.Control.Feedback type="invalid">
                    Password must min 10 chars with letters, numbers and special (!@#$%^&*_+-?)
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepeatPassword">
                <Form.Label>Repeat password: </Form.Label>
                <Form.Control type="password"  placeholder="Password Repeat" value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} isInvalid={validated && !isRepeatPassword } required />
                <Form.Control.Feedback type="invalid">
                    The password must be the same!
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-light" className='btn-one'>Join</Button>
        </Form>
    );
}

export default JoinForm;