export const emailValidator = value => {
    const isEmail = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    return isEmail;
}