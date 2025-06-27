import { Button } from "react-bootstrap";
import styles from "./AmountForm.module.scss";

const AmountForm = () => {
    return(
        <div className="d-flex align-items-center">
            <Button variant="outline-light" size="sm" className="btn fw-bold fs-6">+</Button>
            <input className={styles.amountInput} />
            <Button variant="outline-light" size="sm" className="btn fw-bold fs-6">-</Button>
        </div>
    );
}

export default AmountForm;