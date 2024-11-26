const form = document.querySelector('.contact-form');
const btnClearForm = document.querySelector('.btn-clean');
form.addEventListener('submit', eventHandler);
btnClearForm.addEventListener('click', clearForm);
retriveData();

function eventHandler(e) {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const lastname = document.querySelector('#lastname').value;
    const email = document.querySelector('#email').value;
    const age = document.querySelector('#age').value;

    validadeForm({ name, lastname, email, age });
}

function validadeForm(formData) {
    const name = formData.name;
    const lastname = formData.lastname;
    const email = formData.email;
    const age = formData.age;

    error = {};
    const nameValidation = validateName(name);
    const lastnameValidation = validateLastname(lastname);
    const emailValidation = validateEmail(email);
    const ageValidation = validateAge(age);

    error = {nameValidation, lastnameValidation, emailValidation, ageValidation};

    if (Object.values(error).every(value => !value)) {
        saveData({ name, lastname, email, age });
    }
    showErrors(error);


}

function validateName(name) {
    if (name.length < 3 || name.length > 50) {
        return 'Nome inválido';
    }
    return;
}

function validateLastname(lastname) {
    if (lastname.length < 3 || lastname.length > 50) {
        return 'Sobrenome inválido'
    }
}

function validateEmail(email) {
    regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (regexEmail.test(email)) return;
    return 'Email inválido';
}

function validateAge(age) {

    if (age < 0 || age > 120 || age === '') {
        return 'idade inválida';
    }
    return;
}

function saveData(data) {
    json = JSON.stringify(data);
    localStorage.setItem('formData', json);
    window.location.href = "/confirmation.html"
}

function retriveData() {
    formData = JSON.parse(localStorage.getItem('formData'))

    document.querySelector('#name').value = formData.name ? formData.name : '';
    document.querySelector('#lastname').value = formData.lastname ? formData.lastname : '';
    document.querySelector('#email').value = formData.email ? formData.email : '';
    document.querySelector('#age').value = formData.age ? formData.age : '';
}

function clearForm() {
    localStorage.removeItem('formData');

    document.querySelector('#name').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#age').value = '';
}

function showErrors(errors) {
    const errorName = document.querySelector('.error-name');
    const errorLastname = document.querySelector('.error-lastname');
    const errorEmail = document.querySelector('.error-email');
    const errorAge = document.querySelector('.error-age');

    errorName.textContent = errors.nameValidation? error.nameValidation : '';
    errorLastname.textContent = errors.lastnameValidation? error.lastnameValidation : '';
    errorEmail.textContent = errors.emailValidation? error.emailValidation : '';
    errorAge.textContent = errors.ageValidation? errors.ageValidation : '';

}