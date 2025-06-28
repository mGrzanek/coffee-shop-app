export const updateLocalStorage = (cartProducts) => {
    try {
        const storedData = localStorage.getItem("cartData");
        const parsedData = storedData ? JSON.parse(storedData) : {};
        parsedData.cartProducts = cartProducts;
        localStorage.setItem("cartData", JSON.stringify(parsedData));
    }
    catch(err) {
        console.error('updateLocalStorage error: ', err);
    }
}