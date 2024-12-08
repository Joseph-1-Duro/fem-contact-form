const contactForm = document.getElementById('contact-form');

let field = (field) => document.getElementById(field);

let firstNameField = field('first-name');
let lastNameField = field('last-name');
let emailField = field('email');
let textArea = field('message');
let checkBox = field('consent');
let radios = field('radios')

let radioInputs = document.getElementsByName('query');

contactForm.addEventListener('submit', (e) => {
    let isValid = true;

    if(isRequired(firstNameField)) {
        isValid = false
        showError(firstNameField)
    } else if(hasNumbers(firstNameField)) {
        isValid = false
        showError(firstNameField)
    } else {
        removeError(firstNameField)
    }

    if(isRequired(lastNameField)) {
        isValid = false
        showError(lastNameField)
    } else if (hasNumbers(lastNameField)) {
        isValid = false
        showError(lastNameField)
    }else {
        removeError(lastNameField)
    }

    if(isRequired(textArea)) {
        isValid = false
        showError(textArea)
    } else {
        removeError(textArea)
    }

    if(!validateEmail(emailField)) {
        isValid = false
        showError(emailField)
    } else {
        removeError(emailField)
    }

    // radio
    if (!checkRadio()) {
        isValid = false
        showError(radios)
    } else {
        removeError(radios)
    }

    if(!getCheckBox(checkBox)) {
        isValid = false
        showCheckError(checkBox)
    } else {
        removeCheckError(checkBox)
    }

    !isValid && e.preventDefault();
})

function isRequired(field) {
    return field.value.trim() === '';
}

function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return pattern.test(email.value)
}

function checkRadio() {
    for (radio of radioInputs) {
        if (radio.checked) {
            return true
        } else {
            return false
        }
    }
}

function getCheckBox(box) {
    return box.checked
}

function hasNumbers(field) {
    const pattern = /\d/;

    return pattern.test(field.value)
}

function showError(field) {
    field.classList.add('error')
    let parent = field.parentNode;

    const errorMessage = Array.from(parent.children).find(
        (child) => child.classList.contains('error-message')
    );

    errorMessage.style.display = 'block'
}

function removeError(field) {
    field.classList.remove('error')
    let parent = field.parentNode;

    const errorMessage = Array.from(parent.children).find(
        (child) => child.classList.contains('error-message')
    );

    errorMessage.style.display = 'none'
}

function showCheckError (field) {
    let grandparent = field.parentNode.parentNode

    const errorMessage = Array.from(grandparent.children).find((child) => child.classList.contains('error-message'))

    errorMessage.style.display = 'block'
}

function removeCheckError (field) {
    let grandparent = field.parentNode.parentNode

    const errorMessage = Array.from(grandparent.children).find((child) => child.classList.contains('error-message'))

    errorMessage.style.display = 'none'
}