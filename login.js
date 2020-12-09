const SIGN_IN_BTN = document.querySelector("#sign_in_btn");
const SIGN_UP_BTN = document.querySelector("#sign_up_btn");
const CONTAINER = document.querySelector(".container");

SIGN_UP_BTN.addEventListener('click', () => {
    CONTAINER.classList.add("sign-up-mode");
});

SIGN_IN_BTN.addEventListener('click', () => {
    CONTAINER.classList.remove("sign-up-mode");
});