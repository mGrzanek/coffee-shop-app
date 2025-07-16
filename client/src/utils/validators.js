export const isFirstNameValid = value => {
    return /^[A-ZŻŹĆĄŚĘŁÓŃa-zżźćńółęąś]{3,20}$/.test(value);
};

export const isLastNameValid = value => {
    return /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s-]{3,30}$/.test(value);
};

export const isPhoneValid = value => {
    return /^\d{9,16}$/.test(value);
};

export const isEmailValid = value => {
    return /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
};

export const isStreetValid = value => {
    return /^[A-Za-z0-9\-. ]{3,40}$/.test(value);
};

export const isStreetNumberValid = value => {
    return /^[A-Za-z0-9]{1,5}(\/[A-Za-z0-9]{1,10})?$/i.test(value);
};

export const isCityValid = value => {
    return /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\s.'/-]{3,40}$/.test(value);
};

export const isPasswordValid = value => {
    return /^[A-Za-z0-9!@#$%^&*_+-?]{10,}$/.test(value);
}