const chairs = JSON.parse(localStorage.getItem('selectedChairs') || '[]');
        const wrapper = document.getElementById('tableWrapper');

        if (chairs.length === 0) {
            wrapper.innerHTML = "<p>No chairs selected. Please go back and select chairs to compare.</p>";
        } else {
            let html = `
                <table>
                    <thead>
                        <tr>
                            <th class="feature-col">Feature</th>
                            ${chairs.map(c => `<th>${c.title}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="feature-col">Brand</td>${chairs.map(c => `<td>${c.brand}</td>`).join('')}</tr>
                        <tr><td class="feature-col">Price</td>${chairs.map(c => `<td>${c.price}</td>`).join('')}</tr>
                        <tr><td class="feature-col">Material</td>${chairs.map(c => `<td>${c.material}</td>`).join('')}</tr>
                        <tr><td class="feature-col">Warranty</td>${chairs.map(c => `<td>${c.warranty}</td>`).join('')}</tr>
                        <tr><td class="feature-col">Weight</td>${chairs.map(c => `<td>${c.weight}</td>`).join('')}</tr>
                    </tbody>
                </table>`;
            wrapper.innerHTML = html;
        }