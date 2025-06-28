import styles from "./WeightsForm.module.scss";
import clsx from 'clsx';
import PropTypes from 'prop-types';

const WeightsForm = ({ sortedWeights, activeWeight, setActiveWeight, setCurrentWeightMultiplier }) => {
   
    return(
        <div className='d-flex flex-row p-0' >
            {(sortedWeights || []).map((weight) => 
                <button  
                    key={weight.label} 
                    className={clsx(styles.btnWeight, weight.value === activeWeight && styles.active)}
                    onClick={() => {setActiveWeight(weight.value); setCurrentWeightMultiplier(weight.multiplier) }}
                >
                    {weight.value}g
                </button>
            )}
        </div>
    );
}

WeightsForm.propTypes = {
    sortedWeights: PropTypes.array.isRequired,
    activeWeight: PropTypes.number.isRequired,
    setActiveWeight: PropTypes.func.isRequired,
    setCurrentWeightMultiplier: PropTypes.func.isRequired
}

export default WeightsForm;