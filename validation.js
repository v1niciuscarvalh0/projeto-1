const name = document.querySelector('#name');
const sobrenome = document.querySelector('#sobrenome');
const email = document.querySelector('#email');
const age = document.querySelector('#age');
const submit = document.querySelector('#submit');
const formData = document.querySelector('#contact-form');
formData.addEventListener('submit', (e) => handleSubmit(e));

//submit.addEventListener('click', (e) => handleSubmit(e))


function validaForm() {
    let erro = [];

    if(name.value.length) {

    }
}

function mostraErro() {

}

function handleSubmit(e) {
    e.preventDefault()
    
    json = {
        nome: name.value,
        sobren: sobrenome.value,
        email: email.value,
        age: age.value,
    }

    console.log(json)
}