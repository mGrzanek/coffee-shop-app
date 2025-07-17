import styles from './Contact.module.scss';
import ContactForm from '../../features/ContactForm/ContactForm';

const Contact = () => {
    
    return(
        <div className='col-10 mx-auto'>
            <div className={styles.contact}>
                <span className='col-8 col-sm-6 mx-auto'>Coffee Delicious</span>
                <div className='col-5 col-sm-4'>
                    <div>675-563-564</div>
                    <div>
                        <div>Lorem 12b</div>
                        <div>00-123 Lorem Ipsum</div>
                    </div>
                </div>
            </div>
            <ContactForm />
        </div>
    );
}

export default Contact;