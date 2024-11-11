const formData = JSON.parse(localStorage.getItem('formData'));
const btnEditar = document.querySelector('.btn-form-edit');
const btnForm = document.querySelector('.btn-form');

btnForm.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('formData');
    window.location.href = "/form.html";
})
btnEditar.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "/form.html";
})
document.querySelector('#name').textContent = formData.name;
document.querySelector('#lastname').textContent = formData.lastname;
document.querySelector('#email').textContent = formData.email;
document.querySelector('#age').textContent = formData.age;