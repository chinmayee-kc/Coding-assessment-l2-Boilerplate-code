document.addEventListener("DOMContentLoaded", () => {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            // console.log('API Response:', data);

            if (!data.categories || !data.categories.length) {
                console.error('No products found in the response.');
                return;
            }

            const categories = data.categories;

            const menProducts = categories.find(cat => cat.category_name === "Men")?.category_products || [];
            const womenProducts = categories.find(cat => cat.category_name === "Women")?.category_products || [];
            const kidsProducts = categories.find(cat => cat.category_name === "Kids")?.category_products || [];

            displayProducts('Men', menProducts);
            displayProducts('Women', womenProducts);
            displayProducts('Kids', kidsProducts);

        
            const firstTab = document.querySelector('.tab-link');
            if (firstTab) {
                firstTab.click();
            }
        })
        .catch(error => console.error('Error fetching product data:', error));

    function displayProducts(tab, products) {
        const container = document.getElementById(tab);
        if (!container) {
            console.error(`Container for ${tab} not found.`);
            return;
        }

        container.innerHTML = ''; 
        products.forEach(product => {
            const discountedPrice = product.compare_at_price * 0.5;
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = 
            `
                ${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ''}
                <img src="${product.image}" alt="${product.title}">

                <div class="product-info">
                    <h3><span class='title'>${product.title}</span>   <span class="dot">&bull;</span>   <span class='vendor'>${product.vendor}</span>  </h3>
                </div>
               
                <p class="price">Rs ${discountedPrice.toFixed(2)} <span class="compare-price"> ${parseFloat(product.compare_at_price).toFixed(2)}</span> <span class='offer'>50% Off </span></p>
                <p class="add-to-cart">Add to Cart</p>
            `;
            container.appendChild(card);
        });
    }


    window.openTab = (event, tabName) => {
        const tabLinks = document.getElementsByClassName("tab-link");
        const tabContents = document.getElementsByClassName("tab-content");

        Array.from(tabLinks).forEach(link => link.classList.remove("active"));
        Array.from(tabContents).forEach(content => content.classList.remove("active"));

        event.currentTarget.classList.add("active");
        document.getElementById(tabName).classList.add("active");
    }
});
