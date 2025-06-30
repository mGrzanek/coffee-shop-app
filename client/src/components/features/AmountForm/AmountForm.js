import { useEffect } from "react";
import styles from "./AmountForm.module.scss";
import clsx from "clsx";
import PropTypes from 'prop-types';

const AmountForm = ({ currentAmount, setCurrentAmount }) => {

    useEffect(() => {
        if(currentAmount > 10) setCurrentAmount(10);
        if(currentAmount <= 0) setCurrentAmount(1);
    }, [currentAmount, setCurrentAmount]);

    const amountIncrement = () => {
        if(+currentAmount < 10) setCurrentAmount(+currentAmount + 1);
    }

    const amountDecrement = () => {
        if(+currentAmount > 0) setCurrentAmount(+currentAmount - 1);
    }

    return(
        <div className="d-flex align-items-center">
            <button className={clsx(styles.amountBtn, "btn-one")} onClick={amountDecrement}> - </button>
            <input className={styles.amountInput} value={currentAmount} onChange={(e) => setCurrentAmount(+e.target.value)}/>
            <button className={clsx(styles.amountBtn, "btn-one")} onClick={amountIncrement}> + </button>
        </div>
    );
}

AmountForm.propTypes = {
    currentAmount: PropTypes.number.isRequired,
    setCurrentAmount: PropTypes.func.isRequired
}

export default AmountForm;