import { Button } from "react-bootstrap";
import styles from "./WeightForm.module.scss";

const WeightForm = () => {
    return(
        <div className="d-flex align-items-center">
            <Button variant="outline-light" className="btn fw-bold fs-6">+</Button>
            <input className={styles.amountInput} />
            <Button variant="outline-light" className="btn fw-bold fs-6">-</Button>
        </div>
    );
}

export default WeightForm;