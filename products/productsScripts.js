getData();

const modal = document.getElementById("myModal");
const openModalBtn = document.querySelector(".open-modal-btn");
const closeModalBtn = document.getElementById("closeModal");
const formBtn = document.querySelector('.btn-modal');
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
formBtn.addEventListener("click", insertProduto);



function getData() {
    data = fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(res => productsList(res))
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

function productsList(data) {
    const container = document.querySelector('.card-container');

    data.products.forEach(element => {
        card = document.createElement('div');
        card.classList.add('card')
        card.innerHTML = `
        <div id="${element.id}">
            <div class="img-card">
                <img src="${element.images[0]}">
                <div class="card-content">
                    <div>
                        <h2 class="card-h2">${element.title}</h2>
                        <h2 class="card-h2">${element.brand}</h2>
                        <p class="card-p">Categoria: ${element.category}</p>
                        <p class="card-p">R$ ${element.price}</p>
                    </div>
                    <div class="description">${element.description}</div>
                    <div class="btn-group">
                        <button class="card-btn btn-shop-car">Excluir</button>
                        <button class="card-btn">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
        `

        container.appendChild(card)
    });

    const btnDeleteProduct = document.querySelectorAll(".btn-shop-car");
    btnDeleteProduct.forEach(btn => {
        btn.addEventListener("click", removeProduto);
    })
}

function insertProduto(e) {
    e.preventDefault();

    const container = document.querySelector('.card-container');

    let thumbnail = document.querySelector("#thumbnail")

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const price = parseFloat(document.querySelector('#price').value);
    const brand = document.querySelector('#brand').value;
    const category = document.querySelector('#category').value;

    data = { title, description, brand, category, price, thumbnail }
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
                    <h2 class="card-h2">${title}</h2>
                    <h2 class="card-h2">${brand}</h2>
                    <p class="card-p">R$ ${price}</p>
                </div>
                <div class="description">${description}</div>
                <div class="btn-group">
                    <button class="card-btn btn-shop-car">Excluir</button>
                    <button class="card-btn">Comprar</button>
                </div>
            </div>
        </div>
    `

    container.insertBefore(card, container.firstChild)

    const btnDeleteProduct = document.querySelectorAll(".btn-shop-car");
    btnDeleteProduct.forEach(btn => {
        btn.addEventListener("click", removeProduto);
    })
}

function removeProduto(e) {
    const produto = e.target.closest(".card")
    produto.remove();

}

function validate(data) {
    let erro = false;
    if (data.title.length === 0) {
        const erroTitle = document.querySelector(".erro-title")
        erroTitle.innerText = "Titulo deve ter menos de 3 caracteres ou mais do que 50 caracteres";
        erro = true
    }

    if (data.description.length === 0) {
        let erroTitle = document.querySelector(".erro-description")
        erroTitle.innerText = "Descrição deve ter menos de 3 caracteres ou mais do que 50 caracteres";
        erro = true
    }
    if (data.price < 0 || data.price > 120 || isNaN(data.price)) {
        let erroTitle = document.querySelector(".erro-price")
        erroTitle.innerText = "Preço deve ser positivo e menor que 120";
        erro = true
    }

    if (data.brand.length === 0) {
        let erroTitle = document.querySelector(".erro-brand")
        erroTitle.innerText = "Marca deve ter menos de 3 caracteres ou mais do que 50 caracteres";
        erro = true
    }

    if (data.category.length === 0) {
        let erroTitle = document.querySelector(".erro-category")
        erroTitle.innerText = "Categoria deve ter menos de 3 caracteres ou mais do que 50 caracteres";
        erro = true
    }
console.log(data.thumbnail)
    if (data.thumbnail.files.length === 0) {
        let erroTitle = document.querySelector(".erro-thumbnail")
        erroTitle.innerText = "A imagem nao pode ser vazia";
        erro = true
    }

    return erro;
}