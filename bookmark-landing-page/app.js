// features
const features = [...document.querySelectorAll('.feature')];
const featureTab = [...document.querySelectorAll('.features__tab')];
// faq
const questions = document.querySelectorAll('.question');
// Email validation
const form = document.querySelector('.form');
const emailInputWrapper = document.querySelector('.form__input-wrapper');
const emailInput = document.querySelector('.form__email');
const stateEl = document.querySelector('.form__state');

const nav = document.querySelector('.nav');
const mobileIcon = document.querySelector('.nav__mobile-icon');
const mobileMenu = document.querySelector('.mobile-nav');
const mobileNavLink = document.querySelectorAll('.mobile-nav__link');
const mobileExit = document.querySelector('.mobile-nav__exit');


questions.forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('opened');
    })
});

featureTab.forEach(featureLabel => {
    featureLabel.addEventListener('click', () => {
        performClassSwitcheroo(featureTab, featureLabel, 'active');
        let featureElement = document.getElementById(featureLabel.dataset.feature);
        performClassSwitcheroo(features, featureElement, 'show');
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = emailInput.value;
    if (!validateEmail(email)) {
        showEmailError();
    } else {
        showEmailSuccess()
    }
});

mobileIcon.addEventListener('click', toggleMobileMenu)
mobileExit.addEventListener('click', toggleMobileMenu);
mobileNavLink.forEach(link => link.addEventListener('click', toggleMobileMenu));

function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    nav.classList.toggle('hidden');
    lockBodyScroll();
}

function lockBodyScroll() {
    if (!mobileMenu.classList.contains('hidden')) {
        document.body.style.position = 'fixed';
    } else {
        document.body.style.position = 'relative';
    }
}

function performClassSwitcheroo(elements, target, className) {
    elements
        .filter(elem => elem.classList.contains(className))
        .forEach(elem => elem.classList.remove(className));
    target.classList.add(className);
}

function validateEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    return emailRegex.test(email);
}

function showEmailError() {
    resetEmailForm()
    showErrorMsg();
    emailInput.focus();

    // on input change, hide msg but leave the red border and error icon
    emailInput.addEventListener('input', hideValidationMsg);
}

function showEmailSuccess() {
    resetEmailForm();
    showSuccessMsg();
    emailInput.value = '';
    emailInput.blur();

    emailInput.addEventListener('input', hideValidationMsg);
}

function showErrorMsg() {
    stateEl.classList.add('error');
    showValidationMsg();
    stateEl.innerText = `Whoops, make sure it's an email`;
}

function showSuccessMsg() {
    stateEl.classList.add('success');
    showValidationMsg();
    stateEl.innerText = `Email submitted`;
}

function translateInputWrapper() {
    if (stateEl.classList.contains('show')) {
        emailInputWrapper.classList.add('translate-up');
    } else {
        emailInputWrapper.classList.remove('translate-up');
    }
}

function showValidationMsg() {
    stateEl.classList.add('show');
    translateInputWrapper();
}

function hideValidationMsg() {
    stateEl.classList.remove('show');
    translateInputWrapper();
}

function resetEmailForm() {
    hideValidationMsg();
    stateEl.classList.remove('success');
    stateEl.classList.remove('error');
}


