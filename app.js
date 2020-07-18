//variable

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

//cart
let cart = [];
//buttons
let buttonsDOM =[];

//getting the products
class Products {
    async getProducts() {
        try {
            let result = await (await fetch('products.json')).json();
            let products = result.items;
            result = products.map((item, index) => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image };
            })
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

//display Products
class UI {
    displayProducts(products) {
        console.log('product', products)
        let result = '';
        products.forEach(product => {
            result += `
        <article class="product">
          <div class="img-container">
            <img
              src=${product.image}
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart"></i>
              add to bag
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
        `;
        });
        productsDOM.innerHTML = result;
    }
    getBagButtons() {
        const allbtns = [...document.querySelectorAll(".bag-btn")];
buttonsDOM= allbtns;
        allbtns.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }
                button.addEventListener("click", (event) => {
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                    console.log('event', event)
                    //get product from products
                    //add product to the cart
                    //save cart in locaj storage
                    //set cart values
                    //display cart item
                    //show the cart
                });
            
        })
        console.log('allbtns', allbtns);
    }
}

//local storage
class Storage {

    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(item=>item.id===id);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProducts().then(response => {
        ui.displayProducts(response);
        Storage.saveProducts(response);
    })
        .then(() => {
            ui.getBagButtons()
        });


})