import styles from './Hero.module.scss';

const Hero = () => {
    return(
        <div className={styles.hero}>
            <div className={styles.layer}>
                <h1>Coffee Delicious</h1>
                <h4>start your day with the perfect coffee</h4>
            </div>
        </div>
    );
}

export default Hero;