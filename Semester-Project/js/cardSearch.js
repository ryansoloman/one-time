let currentCategory = 'all';
let selectedChairs = [];

function setCategory(cat, btn) {
    let buttons = document.getElementsByClassName("btn");
    for (let b of buttons) { b.classList.remove("active"); }
    btn.classList.add("active");
    currentCategory = cat;
    runFilters();
}

function runFilters() {
    let searchInput = document.getElementById("searchField").value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let card of cards) {
        let title = card.querySelector("h3").innerText.toLowerCase();
        let brand = card.getAttribute("data-brand");
        let matchCategory = (currentCategory === 'all' || brand === currentCategory);
        let matchSearch = title.includes(searchInput);
        card.style.display = (matchCategory && matchSearch) ? "block" : "none";
    }
}

// Comparison Selection Logic
function toggleComparison(checkbox, title) {
    const card = checkbox.closest('.card');
    const chairData = {
        title: title,
        brand: card.getAttribute('data-brand'),
        price: card.getAttribute('data-price'),
        material: card.getAttribute('data-material'),
        warranty: card.getAttribute('data-warranty'),
        weight: card.getAttribute('data-weight')
    };

    if (checkbox.checked) {
        if (selectedChairs.length >= 4) {
            alert("You can compare up to 4 chairs at a time.");
            checkbox.checked = false;
            return;
        }
        selectedChairs.push(chairData);
    } else {
        selectedChairs = selectedChairs.filter(c => c.title !== title);
    }
    updateComparisonUI();
}

function updateComparisonUI() {
    const bar = document.getElementById('comparisonBar');
    const countText = document.getElementById('comparisonCount');
    countText.innerText = `${selectedChairs.length} chair(s) selected for comparison`;

    if (selectedChairs.length > 0) {
        bar.classList.add('active');
    } else {
        bar.classList.remove('active');
    }
}

function goToComparisonPage() {
    localStorage.setItem('selectedChairs', JSON.stringify(selectedChairs));
    window.location.href = 'comparison.html';
}