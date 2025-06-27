import styles from "./WeightsForm.module.scss";
import clsx from 'clsx';
import { getWeights } from './../../../redux/weightsReducer';
import { useSelector } from "react-redux";
import { useState } from "react";
import PropTypes from 'prop-types';

const WeightsForm = ({ setCurrentWeight }) => {
    const weights = useSelector(getWeights);
    const sortedWeights = weights.sort((a, b) => {
        return a.value - b.value;
    });
    const [activeWeight, setActiveWeight] = useState(sortedWeights[0].value);

    return(
        <div className='d-flex flex-row p-0' >
            {sortedWeights.map((weight) => 
                <button  
                    key={weight.label} 
                    className={clsx(styles.btnWeight, weight.value === activeWeight && styles.active)}
                    onClick={() =>  {setActiveWeight(weight.value); setCurrentWeight(weight.multiplier) }}
                >
                    {weight.value}g
                </button>
            )}
        </div>
    );
}

WeightsForm.propTypes = {
    setCurrentWeight: PropTypes.func.isRequired
}

export default WeightsForm;