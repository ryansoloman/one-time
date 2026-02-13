let allProducts = [];
let currentCategory = 'all';
// Initialize from storage so data persists across page navigation
let selectedChairs = JSON.parse(localStorage.getItem('selectedChairs') || '[]');

async function init() {
    try {
        const response = await fetch('./json/products.json');
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        allProducts = await response.json();
        renderCards(allProducts);
        updateComparisonUI(); // Sync the UI bar on load
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function renderCards(products) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';

    products.forEach(product => {
        // Check if this chair is already in our selection
        const isSelected = selectedChairs.some(c => c.title === product.model);
        
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-brand', product.brand_id);
        card.setAttribute('data-price', `$${product.price.toLocaleString()}`);
        card.setAttribute('data-material', product.specs.material);
        card.setAttribute('data-warranty', product.specs.warranty);
        card.setAttribute('data-weight', `${product.specs.weight_kg}kg`);

        card.innerHTML = `
            <div class="card-container">
                <div class="comparison-checkbox">
                    <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleComparison(this, '${product.model}')">
                </div>
                <div class="info-header">
                    <span class="category">${product.brand}</span>
                    <span class="model-no">${product.sku}</span>
                </div>
                <div class="image-box">
                    <img src="${product.image}" alt="${product.model}">
                </div>
                <div class="footer">
                    <h3 class="product-title">${product.model}</h3>
                    <div class="price-row"><span class="price">$${product.price.toLocaleString()}</span></div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function toggleComparison(checkbox, title) {
    const card = checkbox.closest('.card');
    if (checkbox.checked) {
        if (selectedChairs.length >= 4) {
            alert("Max 4 chairs.");
            checkbox.checked = false;
            return;
        }
        selectedChairs.push({
            title: title,
            brand: card.querySelector('.category').innerText,
            price: card.getAttribute('data-price'),
            material: card.getAttribute('data-material'),
            warranty: card.getAttribute('data-warranty'),
            weight: card.getAttribute('data-weight')
        });
    } else {
        selectedChairs = selectedChairs.filter(c => c.title !== title);
    }
    // Save selection so it survives page changes
    localStorage.setItem('selectedChairs', JSON.stringify(selectedChairs));
    updateComparisonUI();
}

function updateComparisonUI() {
    const bar = document.getElementById('comparisonBar');
    const countText = document.getElementById('comparisonCount');
    if (countText) countText.innerText = `${selectedChairs.length} chair(s) selected`;
    if (bar) {
        selectedChairs.length > 0 ? bar.classList.add('active') : bar.classList.remove('active');
    }
}

// Global deselect function for the furniture page
function clearAllSelections() {
    selectedChairs = [];
    localStorage.removeItem('selectedChairs');
    document.querySelectorAll('.comparison-checkbox input').forEach(i => i.checked = false);
    updateComparisonUI();
}

function goToComparisonPage() {
    window.location.href = 'comparison.html';
}

init();