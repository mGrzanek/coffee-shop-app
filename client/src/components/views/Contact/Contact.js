import styles from './Contact.module.scss';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../../redux/statusReducer';

const Contact = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setValidated(true);
        if(title && message){
            dispatch(updateStatus('pending'));
        }
    }
    return(
        <div className='col-10 mx-auto'>
            <div className={styles.contact}>
                <h4>Delicious Coffee</h4>
                <div>675-563-564</div>
                <div>Lorem 12</div>
                <div>00-123 Warsaw</div>
            </div>
            <Form  noValidate onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control className={styles.form} type="text" placeholder="Subject" value={title} onChange={e => setTitle(e.target.value)} isInvalid={validated && title.length > 0} required />
                    <Form.Control.Feedback type="invalid">
                        Subject required.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Control 
                    as="textarea" 
                    rows={5} className={styles.form} 
                    placeholder="Add your message here..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
                 <Button variant="outline-light" className="btn-two">Send </Button>
            </Form>
        </div>
    );
}

export default Contact;