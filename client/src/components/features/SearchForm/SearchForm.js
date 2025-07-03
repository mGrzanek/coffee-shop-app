import { Form, Button, Col } from "react-bootstrap";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SearchForm = () => {
    const [wantedProduct, setWantedProduct] = useState('');

    return(
        <Form as={Col} className="mx-auto d-flex flex-column flex-sm-row justify-content-center align-items-center p-2 col-10 col-md-6 ">
            <Form.Control type="text" placeholder="Search product..." className="m-2" value={wantedProduct} onChange={e => setWantedProduct(e.target.value)}/>
            <Button variant="outline-light" className="btn-one" as={NavLink} to={`/products/search/${wantedProduct}`}>
                Search
            </Button>
        </Form>
    )
}

export default SearchForm;