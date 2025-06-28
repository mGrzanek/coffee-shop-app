import Products from "./../../features/Products/Products";
import { useSelector } from "react-redux";
import Loader from "../../common/Loader/Loader";
import { getStatus } from "../../../redux/statusReducer";
import { useEffect, useState } from "react";

const Home = () => {
    const status = useSelector(getStatus);
    const [statusAction, setStatusAction] = useState(status);

    useEffect(() => {
        setStatusAction(status);
    }, [status]);

    return(
       <div className="py-3"> 
            {statusAction === "pending" && <Loader />}
            {statusAction !== "pending" && <Products />}
        </div>
    );
}

export default Home;