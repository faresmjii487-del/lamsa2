// المنتجات النموذجية
const productsList = [
    {id:1, name:"بلوفر نسائي كلاسيكي", price:12.5, img:"images/prod1.jpg", category:"women"},
    {id:2, name:"بلوفر رجالي", price:15, img:"images/prod2.jpg", category:"men"},
    {id:3, name:"بلوفر للأطفال", price:10, img:"images/prod3.jpg", category:"kids"},
    {id:4, name:"بلوفر شتوي فاخر", price:20, img:"images/prod4.jpg", category:"women"},
    {id:5, name:"بلوفر برقبة عالية", price:18, img:"images/prod5.jpg", category:"men"},
    {id:6, name:"بلوفر خفيف", price:8, img:"images/prod6.jpg", category:"kids"},
];

// رندر المنتجات على index.html
const productsContainer = document.getElementById("products");
if(productsContainer){
productsList.forEach(p => {
    productsContainer.innerHTML += `
    <div class="product-card">
        <img src="${p.img}">
        <div class="product-body">
            <h3>${p.name}</h3>
            <p>خامة ممتازة وراحة عالية.</p>
            <div class="price-add">
                <span class="price">${p.price} د.ك</span>
                <button class="btn-add" onclick="addToCart(${p.id})">أضف</button>
            </div>
        </div>
    </div>`;
});
}

// رندر التصنيفات products.html
function renderCategory(catId, elementId){
    const container = document.getElementById(elementId);
    if(container){
        productsList.filter(p => p.category === catId).forEach(p=>{
            container.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <div class="product-body">
                    <h3>${p.name}</h3>
                    <p>خامة ممتازة وراحة عالية.</p>
                    <div class="price-add">
                        <span class="price">${p.price} د.ك</span>
                        <button class="btn-add" onclick="addToCart(${p.id})">أضف</button>
                    </div>
                </div>
            </div>`;
        });
    }
}
renderCategory("women","womenProducts");
renderCategory("men","menProducts");
renderCategory("kids","kidsProducts");

// ---------------- CART ----------------
let cart = JSON.parse(localStorage.getItem("cart")) || {};
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}
function addToCart(id){
    if(!cart[id]) cart[id]={qty:0};
    cart[id].qty++;
    saveCart();
    showCart();
}
function showCart(){
    const cartBox = document.getElementById("cartBox");
    if(cartBox) cartBox.style.transform = "translateY(0)";
}
document.getElementById("closeCart")?.addEventListener("click",()=>{document.getElementById("cartBox").style.transform="translateY(120%)"});
const cartItemsBox = document.getElementById("cartItems");
function updateCartUI(){
    if(!cartItemsBox) return;
    cartItemsBox.innerHTML="";
    let total=0;
    Object.keys(cart).forEach(id=>{
        const product = productsList.find(p=>p.id==id);
        const qty = cart[id].qty;
        total += product.price*qty;
        cartItemsBox.innerHTML += `
        <div class="cart-item">
            <img src="${product.img}" style="width:40px; margin-right:10px;">
            <div style="flex:1;">
                <strong>${product.name}</strong>
                <div style="font-size:14px;color:#777;">${product.price} × ${qty}</div>
            </div>
        </div>`;
    });
    localStorage.setItem("cart_total", total.toFixed(3));
}
updateCartUI();

// ---------------- LANGUAGE SWITCH ----------------
let lang = "ar";
const langBtn = document.getElementById("langBtn");
langBtn?.addEventListener("click", ()=>{
    if(lang==="ar"){
        document.getElementById("heroTitle")?.innerText="Welcome to the Sweater Store";
        document.getElementById("heroDesc")?.innerText="Best materials — Best quality — Best prices";
        document.getElementById("productsTitle")?.innerText="Our Products";
        langBtn.innerText="عربي";
        lang="en";
    }else{
        document.getElementById("heroTitle")?.innerText="مرحبا بك في متجر البلوفرات";
        document.getElementById("heroDesc")?.innerText="أفضل خامات — أفضل جودة — أفضل الأسعار";
        document.getElementById("productsTitle")?.innerText="منتجاتنا";
        langBtn.innerText="English";
        lang="ar";
    }
});