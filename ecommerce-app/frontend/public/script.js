const apiUrl = 'http://localhost:5000/api/products';

async function fetchProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products);
}

function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="editProduct('${product._id}')">Edit</button>
            <button onclick="deleteProduct('${product._id}')">Delete</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

async function createProduct() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price }),
    });

    if (response.ok) {
        fetchProducts();
    }
}

async function updateProduct(id) {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price }),
    });

    if (response.ok) {
        fetchProducts();
    }
}

async function deleteProduct(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        fetchProducts();
    }
}

async function searchProduct() {
    const query = document.getElementById('search').value;
    const response = await fetch(`${apiUrl}?search=${query}`);
    const products = await response.json();
    displayProducts(products);
}

document.getElementById('create-product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    createProduct();
});

fetchProducts();