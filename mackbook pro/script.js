// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');
    const filterForm = document.querySelector('.filter-form');
    const cards = document.querySelectorAll('.card');

    // Search functionality
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            if (title.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Filter functionality
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form submission
        const selectedBrands = Array.from(filterForm.querySelectorAll('input[name="brand"]:checked')).map(input => input.value);
        const selectedPrice = filterForm.querySelector('input[name="price"]:checked') ? .value;
        const selectedSpecs = Array.from(filterForm.querySelectorAll('input[name="specs"]:checked')).map(input => input.value);

        cards.forEach(card => {
            const brandMatch = selectedBrands.length === 0 || card.querySelector('h2').textContent.includes(selectedBrands[0]);
            const priceMatch = selectedPrice ? checkPrice(selectedPrice, card.querySelector('.price').textContent) : true;
            const specsMatch = selectedSpecs.length === 0 || selectedSpecs.every(spec => card.querySelector('h2').textContent.includes(spec));

            if (brandMatch && priceMatch && specsMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Helper function to check price range
    function checkPrice(range, priceText) {
        const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
        const [min, max] = range.split('-').map(Number);
        return price >= min && price <= max;
    }
});