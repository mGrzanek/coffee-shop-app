import { Spinner } from "react-bootstrap";

const Loader = () => {
    return(
        <Spinner className="d-block mx-auto my-5" animation="border" variant="dark" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default Loader;