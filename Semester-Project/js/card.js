const container = document.querySelector('#product-container');

async function renderProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();

        const html = products.map(product => {
            return `
        <div class="wrapper">
          <div class="product-img">
            <img src="${product.image}" height="420" width="327" alt="${product.name}">
          </div>
          <div class="product-info">
            <div class="product-text">
              <h1>${product.name}</h1>
              <h2>${product.author}</h2>
              <p>${product.description}</p>
            </div>
            <div class="product-price-btn">
              <p><span>${product.price}</span>$</p>
              <button type="button">buy now</button>
            </div>
          </div>
        </div>
      `;
        }).join('');

        container.innerHTML = html;
    } catch (err) {
        console.error("Failed to load products:", err);
        container.innerHTML = "<h2>Error loading products.</h2>";
    }
}

renderProducts();