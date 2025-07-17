import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../../../redux/statusReducer';
import { API_URL } from "./../../../config"
import { isEmailValid } from '../../../utils/validators';
import { getUser } from '../../../redux/userReducer';
import styles from './ContactForm.module.scss';

const ContactForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState(user?.email || '');
    const [message, setMessage] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setValidated(true);
        if(user && email !== user.email) setEmail(user.email);
        if(subject.length >= 3 && subject.length <= 30 && message && message.length >= 3 && message.length <= 500 && isEmailValid(email)){
            dispatch(updateStatus('pending'));
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject,
                    message,
                    email,
                }),
                credentials: 'include'
            };
            fetch(`${API_URL}/api/messages`, options)
            .then(res => {
                if(res.ok) {
                    dispatch(updateStatus('success'));
                    setValidated(false);
                    setEmail('');
                    setSubject('')
                    setMessage('');
                }
                else if (res.status >= 400 && res.status < 500) dispatch(updateStatus('clientError'));
                else dispatch(updateStatus('serverError'));
            })
            .catch(err => {
                console.error(err);
                dispatch(updateStatus('serverError'));
            });
        } else dispatch(updateStatus('clientError'));
    }

    return(
        <Form  noValidate onSubmit={handleSubmit}>
            {!user && <Form.Group className='mb-2'>
                <Form.Control className={styles.form} type="text" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} isInvalid={validated && !isEmailValid(email)} required />
                <Form.Control.Feedback type="invalid">
                    Invalid email.
                </Form.Control.Feedback>
            </Form.Group>}
            <Form.Group className='mb-2'>
                <Form.Control className={styles.form} type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} isInvalid={validated && (subject.length < 3 || subject.length > 30)} required />
                <Form.Control.Feedback type="invalid">
                    Subject between 3-30 chars.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Control 
                as="textarea" 
                rows={5} className={styles.form} 
                placeholder="Add your message here..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                isInvalid={validated && (message.length <= 0 || message.length > 500)} required />
                <Form.Control.Feedback type="invalid">
                    Message between 3 - 500 chars.
                </Form.Control.Feedback>
                <Button type='submit' variant="outline-light" className="btn-two mt-2">Send </Button>
        </Form>
    );
}

export default ContactForm;