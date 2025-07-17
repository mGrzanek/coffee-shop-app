import { Form, Button } from 'react-bootstrap';
import { getStatus, updateStatus } from "../../../redux/statusReducer";
import { useDispatch, useSelector } from "react-redux";
import { isPasswordValid } from '../../../utils/validators';
import Loader from "../../common/Loader/Loader";
import PasswordForm from '../../features/PasswordForm/PasswordForm';
import PageTitle from '../../common/PageTitle/PageTitle';
import { useState } from "react";
import AlertMessage from '../../common/AlertMessage/AlertMessage';
import { API_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

const UserUpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(getStatus);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const [validated, setValidated] = useState(false);
    const isRepeatPassword = newPassword === newPasswordRepeat;

    const handleSubmit = e => {
        e.preventDefault();
        setValidated(true);
        if(password && isPasswordValid(newPassword) && isRepeatPassword){
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    password,
                    newPassword,
                    newPasswordRepeat
                }),
            };
            fetch(`${API_URL}/api/auth/user/password`, options)
                .then(res => {
                    if(res.ok) {
                        dispatch(updateStatus('success'));
                        navigate('/');
                    } else if(res.status >= 400 && res.status < 500) dispatch(updateStatus('clientError'));
                    else dispatch(updateStatus('serverError'));
                })
                .catch(() => dispatch(updateStatus('serverError')));
        } else dispatch(updateStatus('clientError'));
    }
    return(
        <Form className="col-10 col-sm-8 col-md-4 mx-auto" noValidate onSubmit={handleSubmit}>
            {status === "loginError" && <AlertMessage variant="warning" alertTitle="Email exist yet" alertContent="Email is already taken" />}
            {status === "clientError" && <AlertMessage variant="danger" alertTitle="Invalid data" alertContent="You must complete all fields correctly." />}
            {status === "serverError" && <AlertMessage variant="danger" alertTitle="Something went wrong..." alertContent="Unexpected error... Please try again." />}
            {status === "pending" && <Loader />}
            <h2 className="my-4 text-warning">
                <PageTitle>Update password:</PageTitle>
            </h2>
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} isInvalid={validated && !password} required />
                <Form.Control.Feedback type="invalid">
                    Password required.
                </Form.Control.Feedback>
            </Form.Group>
            <PasswordForm password={newPassword} setPassword={setNewPassword} passwordRepeat={newPasswordRepeat} setPasswordRepeat={setNewPasswordRepeat} 
                isRepeatPassword={isRepeatPassword} validated={validated} register={false} />
            <div className='d-flex justify-content-between align-items-center'>
                <Button type="submit" variant="outline-light" className='btn-one'>Update</Button>
                <Button type="button" variant="outline-light" className='btn-one' onClick={() => navigate('/user/settings')}>Cancel</Button>
            </div>
        </Form>
    );
}

export default UserUpdatePassword;