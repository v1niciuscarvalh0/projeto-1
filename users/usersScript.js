getData();

const modal = document.getElementById("myModal");
const openModalBtn = document.querySelector(".open-modal-btn");
const closeModalBtn = document.getElementById("closeModal");
const formBtn = document.querySelector('.btn-modal');
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
formBtn.addEventListener("click", insertUsuario);



function getData() {
    data = fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(res => usersList(res))
}
function openModal() {
    modal.style.display = "block"; 
}

function closeModal() {
    modal.style.display = "none"; 
}

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

function usersList(data) {
    const container = document.querySelector('.card-container');

    data.users.forEach(element => {
        card = document.createElement('div');
        card.classList.add('card')
        card.innerHTML = `
        <div id="${element.id}">
            <div class="img-card">
                <img src="${element.image}">
                <div class="card-content">
                    <div>
                        <h2 class="card-h2">${element.firstName} ${element.lastName}</h2>
                        <h2 class="card-h2">${element.age}</h2>
                        <p class="card-p">Email: ${element.email}</p>
                    </div>
                    <div class="btn-group">
                        <button class="card-btn btn-shop-car">Excluir</button>
                    </div>
                </div>
            </div>
        </div>
        `

        container.appendChild(card)
    });

    const btnDeleteUser = document.querySelectorAll(".btn-shop-car");
    btnDeleteUser.forEach(btn => {
        btn.addEventListener("click", removeUsuario);
    })
}

function insertUsuario(e) {
    e.preventDefault();

    const container = document.querySelector('.card-container');

    let thumbnail = document.querySelector("#thumbnail")

    const firstName = document.querySelector('#first-name').value;
    const lastName = document.querySelector('#last-name').value;
    const age = parseFloat(document.querySelector('#age').value);
    const email = document.querySelector('#email').value;

    data = { firstName, lastName, age, email, thumbnail }
    if (validate(data)) {
        return;
    }
    thumbnail = document.querySelector("#thumbnail").files[0]

    const url = URL.createObjectURL(thumbnail);

    card.innerHTML = `
        <div class="img-card">
            <img src="${url}"}">
            <div class="card-content">
                <div>
                    <h2 class="card-h2">${firstName} ${lastName}</h2>
                    <h2 class="card-h2">${age}</h2>
                    <p class="card-p">${email}</p>
                </div>
                <div class="btn-group">
                    <button class="card-btn btn-shop-car">Excluir</button>
                </div>
            </div>
        </div>
    `

    container.insertBefore(card, container.firstChild)

    const btnDeleteProduct = document.querySelectorAll(".btn-shop-car");
    btnDeleteProduct.forEach(btn => {
        btn.addEventListener("click", removeUsuario);
    })
}

function removeUsuario(e) {
    const produto = e.target.closest(".card")
    produto.remove();

}

function validate(data) {
    let erro = false;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (data.firstName.length === 0 || data.firstName.length < 3 || data.firstName.length  > 120) {
        const erroFirstName = document.querySelector(".erro-first-name")
        erroFirstName.innerText = "Nome deve ter menos de 3 caracteres ou mais do que 50 caracteres";
        erro = true
    }

    if (data.lastName.length === 0 || data.lastName.length < 3 || data.lastName.length  > 120) {
        let erroLastName = document.querySelector(".erro-last-name")
        erroLastName.innerText = "Descrição deve ter menos de 3 caracteres ou mais do que 50 caracteres";
        erro = true
    }

    if (data.age < 0 || data.age > 120 || isNaN(data.age)) {
        let erroAge = document.querySelector(".erro-age")
        erroAge.innerText = "Idade deve ser um número positivo e menor do que 120";
        erro = true
    }

    if (data.email.length === 0 || !emailRegex.test(data.email)) {
        let erroEmail = document.querySelector(".erro-email")
        erroEmail.innerText = "Email inválido";
        erro = true
    }

    if (data.thumbnail.files.length === 0) {
        let erroTitle = document.querySelector(".erro-thumbnail")
        erroTitle.innerText = "A imagem não pode ser vazia";
        erro = true
    }

    return erro;
}