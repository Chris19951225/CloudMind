const SIGN_IN_BTN = document.querySelector("#sign_in_btn");
const SIGN_UP_BTN = document.querySelector("#sign_up_btn");
const CONTAINER = document.querySelector(".container");
const FORGOT_INFO_LINK = document.querySelector(".forgot-info-link");
const FORGOT_BACK_BTN = document.querySelector("#forgot_back_btn");



SIGN_UP_BTN.addEventListener('click', () => {
    CONTAINER.classList.add("sign-up-mode");
});

SIGN_IN_BTN.addEventListener('click', () => {
    CONTAINER.classList.remove("sign-up-mode");
});

FORGOT_INFO_LINK.addEventListener('click', () => {
    document.getElementById('sign_in_form').style.display='none';
    document.getElementById('recover_form').style.display='flex';
});

FORGOT_BACK_BTN.addEventListener('click', () => {
    document.getElementById('sign_in_form').style.display='flex';
    document.getElementById('recover_form').style.display='none';
});
