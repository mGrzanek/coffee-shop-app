export const updateLocalStorage = (key, value) => {
    try {
        const storedData = localStorage.getItem("cartData");
        const parsedData = storedData ? JSON.parse(storedData) : {};
        parsedData[key] = value;
        localStorage.setItem("cartData", JSON.stringify(parsedData));
    }
    catch(err) {
        console.error('updateLocalStorage error: ', err);
    }
}