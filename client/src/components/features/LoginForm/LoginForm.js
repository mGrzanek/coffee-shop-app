import { Form, Button } from "react-bootstrap";
import { getStatus, updateStatus } from "../../../redux/statusReducer";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../../../config";
import { fetchUser } from "../../../redux/userReducer";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import Loader from "../../common/Loader/Loader";
import PageTitle from "../../common/PageTitle/PageTitle";
import { useState } from "react";
import { isEmailValid } from "../../../utils/validators";

const LoginForm = () => {
    const status = useSelector(getStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setValidated(true);
        if(isEmailValid(email) && password){
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include', 
                body: JSON.stringify({email, password})
            };
            fetch(`${API_URL}/api/auth/login`, options)
                .then(res => {
                if (res.ok) {
                    dispatch(fetchUser());
                    dispatch(updateStatus('success'));
                    navigate('/');
                } else if (res.status >= 400 && res.status < 500 ) dispatch(updateStatus('clientError'));
                else dispatch(updateStatus('serverError'));
                })
                .catch(err => {
                    dispatch(updateStatus('serverError'));
                    console.error('Unexpected error:', err);  
                });
        }
    }

    return(
        <Form className="col-10 col-sm-8 col-md-4 mx-auto" noValidate onSubmit={handleSubmit}>
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="Invalid data" alertContent="Invalid login or password" />}
            {status === "serverError" && <AlertMessage variant="danger" alertTitle="Something went wrong..." alertContent="Unexpected error... Please try again." />}
            {status === "pending" && <Loader />}
            <h2 className="my-4 text-warning">
                <PageTitle>Sign in</PageTitle>
            </h2>
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} isInvalid={validated && !isEmailValid(email)} required />
                <Form.Control.Feedback type="invalid">
                    Invalid email.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password"  placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} isInvalid={validated && !password } required />
                <Form.Control.Feedback type="invalid">
                    Password required
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-light" className='btn-one'>Log in</Button>
        </Form>
    );
}

export default LoginForm;