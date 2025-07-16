import { isPasswordValid } from "../../../utils/validators";
import PropTypes from 'prop-types';
import { Form } from "react-bootstrap";

const PasswordForm = ({password, setPassword, passwordRepeat, setPasswordRepeat, isRepeatPassword, validated, register}) => {
    return(
        <>
            <Form.Group className="mb-3" controlId="formPassword">
                {register && <Form.Label>Password: </Form.Label>}
                {!register && <Form.Label>New password: </Form.Label>}
                <Form.Control type="password"  placeholder={register ? "Password" : "New password"} value={password} onChange={e => setPassword(e.target.value)} isInvalid={validated && !isPasswordValid(password) } required />
                <Form.Control.Feedback type="invalid">
                    Password must min 10 chars with letters, numbers and special (!@#$%^&*_+-?)
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepeatPassword">
                {register && <Form.Label>Repeat password: </Form.Label>}
                {!register && <Form.Label>Repeat new password: </Form.Label>}
                <Form.Control type="password"  placeholder={register ? "Password Repeat" : "New password repeat"} value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} isInvalid={validated && (!isRepeatPassword || !passwordRepeat) } required />
                <Form.Control.Feedback type="invalid">
                    The password must be the same!
                </Form.Control.Feedback>
            </Form.Group>
        </>
    );
}

PasswordForm.propTypes = {
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    passwordRepeat: PropTypes.string.isRequired,
    setPasswordRepeat: PropTypes.func.isRequired,
    isRepeatPassword: PropTypes.bool.isRequired,
    validated: PropTypes.bool.isRequired,
    register: PropTypes.bool.isRequired,
}

export default PasswordForm;