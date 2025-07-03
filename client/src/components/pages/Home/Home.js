import Products from "./../../features/Products/Products";
import { useSelector } from "react-redux";
import Loader from "../../common/Loader/Loader";
import SearchForm from "../../features/SearchForm/SearchForm";
import AlertMessage from "../../common/AlertMessage/AlertMessage";
import { getStatus } from "../../../redux/statusReducer";

const Home = () => {
    const status = useSelector(getStatus);

    return(
       <div className="py-3"> 
            {status === 'success' && <AlertMessage variant="success" alertTitle="Success!" alertContent="The process successful!" />}
            {status === "pending" && <Loader />}
            {status !== "pending" && <SearchForm />}
            {status !== "pending" && <Products />}
        </div>
    );
}

export default Home;