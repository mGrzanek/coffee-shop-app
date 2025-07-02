import styles from "./WeightsForm.module.scss";
import clsx from 'clsx';
import PropTypes from 'prop-types';

const WeightsForm = ({ weights, activeWeight, setActiveWeight, setCurrentWeightMultiplier }) => {
    const sortedWeights = weights.sort((a, b) => {
        return a.value - b.value;
    });
    return(
        <div className='d-flex flex-row p-0' >
            {(sortedWeights || []).map((weight) => 
                <button  
                    key={weight.label} 
                    className={clsx(styles.btnWeight, weight.value === activeWeight && styles.active)}
                    onClick={() => {setActiveWeight(weight.value); setCurrentWeightMultiplier?.(weight.multiplier) }}
                >
                    {weight.value}g
                </button>
            )}
        </div>
    );
}

WeightsForm.propTypes = {
    weights: PropTypes.array.isRequired,
    activeWeight: PropTypes.number.isRequired,
    setActiveWeight: PropTypes.func.isRequired,
    setCurrentWeightMultiplier: PropTypes.func,
}

export default WeightsForm;