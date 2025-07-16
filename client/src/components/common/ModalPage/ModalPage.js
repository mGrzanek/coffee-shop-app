import { useState } from 'react';
import { Modal } from "react-bootstrap";
import PageTitle from '../PageTitle/PageTitle';
import PropTypes from 'prop-types';
import styles from './ModalPage.module.scss';
import clsx from 'clsx';

const ModalPage = ({ children, header}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className={clsx(styles.link, 'text-light mx-3')} onClick={handleShow}>
                {header}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className={styles.header}>
                    <Modal.Title className='mx-auto'><PageTitle>{header}</PageTitle></Modal.Title>
                </Modal.Header>
                <Modal.Body className='mx-auto'>{children}</Modal.Body>
                <Modal.Footer className={styles.header} />
            </Modal>
        </>
    );
}

ModalPage.propTypes = {
    children: PropTypes.node,
    header: PropTypes.string.isRequired,
}

export default ModalPage;