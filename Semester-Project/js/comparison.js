// Load the current selection
let chairs = JSON.parse(localStorage.getItem('selectedChairs') || '[]');
const wrapper = document.getElementById('tableWrapper');

function renderComparison() {
    if (chairs.length === 0) {
        wrapper.innerHTML = `
            <div class="empty-state">
                <p>No chairs selected. Please go back and select chairs to compare.</p>
                <a href="cardSearch.html" class="back-btn">Return to Collection</a>
            </div>`;
        return;
    }

    let html = `
        <div class="table-actions">
            <button onclick="clearAndReturn()" class="deselect-btn">Deselect All & Return</button>
        </div>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th class="feature-label">Feature</th>
                    ${chairs.map((c, index) => `
                        <th>
                            <div class="column-header">
                                <span>${c.title}</span>
                                <button class="remove-item" onclick="removeChair(${index})" title="Remove chair">✕</button>
                            </div>
                        </th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <tr><td class="feature-label">Brand</td>${chairs.map(c => `<td>${c.brand}</td>`).join('')}</tr>
                <tr class="price-row"><td class="feature-label">Price</td>${chairs.map(c => `<td class="price-value">${c.price}</td>`).join('')}</tr>
                <tr><td class="feature-label">Material</td>${chairs.map(c => `<td>${c.material}</td>`).join('')}</tr>
                <tr><td class="feature-label">Warranty</td>${chairs.map(c => `<td>${c.warranty}</td>`).join('')}</tr>
                <tr><td class="feature-label">Weight</td>${chairs.map(c => `<td>${c.weight}</td>`).join('')}</tr>
            </tbody>
        </table>`;
    wrapper.innerHTML = html;
}

// NEW: Remove a single chair
function removeChair(index) {
    chairs.splice(index, 1);
    localStorage.setItem('selectedChairs', JSON.stringify(chairs));
    renderComparison(); // Re-render table locally
}

function clearAndReturn() {
    localStorage.removeItem('selectedChairs');
    window.location.href = 'cardSearch.html';
}

renderComparison();